// @flow

import { fromJS, List, Map } from "immutable";

export type ConversionModel = {
  out?: string,
  out_path?: string,
  default?: ?any,
  convertIn?: (value: any) => any,
  convertOut?: (value: any) => any,
  complex?: boolean,
  validate?: $FlowFixMe,
  [key: string]: ConversionModel,
};

export type ConversionJob = {
  in: string,
  out: string,
  convertIn: (v: any) => any,
  convertOut: (v: any) => any,
  validate: $FlowFixMe,
  default: any,
};

export type ConversionJobs = List<ConversionJob>;

export function convertConversionModelToConversionJobs(
  model: ConversionModel,
  currentInPath?: string = "",
  parentOutPath?: string = "",
): ConversionJobs {
  if (typeof model !== "object" || model == null) {
    return List();
  }
  const currentNodeOutPath =
    "out" in model || "out_path" in model ? model.out || model.out_path : "";
  const currentOutPath = `${parentOutPath != ""
    ? `${parentOutPath}.${currentNodeOutPath}`
    : currentNodeOutPath}`;
  const jobs = List()
    .concat(
      currentInPath !== ""
        ? List.of({
            in: currentInPath,
            out: currentOutPath,
            convertIn: "convertIn" in model ? model.convertIn : value => value,
            convertOut:
              "convertOut" in model ? model.convertOut : value => value,
            default: model.default,
            validate: "validate" in model ? model.validate : undefined,
          })
        : List(),
    )
    .concat(
      Object.keys(model)
        .filter(
          nodeKey =>
            ![
              "convertIn",
              "convertOut",
              "out",
              "out_path",
              "complex",
              "default",
              "validate",
            ].includes(nodeKey),
        )
        .reduce((red: ConversionJobs, nodeKey: string): ConversionJobs => {
          const childNode = model[nodeKey];
          const childInPath = currentInPath
            ? `${currentInPath}.${nodeKey}`
            : nodeKey;
          return red.concat(
            convertConversionModelToConversionJobs(
              childNode,
              childInPath,
              currentOutPath,
            ),
          );
        }, List()),
    );
  return jobs;
}

export function convertIn(
  value?: ?Object,
  jobs: ConversionJobs,
  props: Object,
): Object {
  if (value == null) return {};
  const immutableValue = fromJS(value);
  return jobs
    .reduceRight((red, job) => {
      const inPath = job.in.split(".");
      const notConvertedValue =
        inPath.length === 1 && inPath[0] === ""
          ? immutableValue
          : immutableValue.getIn(inPath, red.getIn(inPath, job.default));
      const inValue =
        typeof job.convertIn === "function"
          ? job.convertIn(notConvertedValue, props)
          : notConvertedValue;
      const outPath = job.out.split(".");
      if (
        (red.getIn(outPath) != null && inValue != null && inValue !== false) ||
        (outPath.length === 1 && outPath[0] === "")
      )
        return red;
      return red.setIn(outPath, fromJS(inValue));
    }, Map())
    .toJS();
}

export function convertOut(
  value?: ?Object,
  jobs: ConversionJobs,
  props: Object,
): Object {
  if (value == null) return {};
  const immutableValue = fromJS(value);
  return jobs
    .reduceRight((red, job) => {
      const outPath = job.out.split(".");
      const notConvertedValue = immutableValue.getIn(outPath);
      const outValue =
        typeof job.convertOut === "function"
          ? job.convertOut(notConvertedValue, props)
          : notConvertedValue;
      if (outValue === undefined) {
        return red;
      }
      const inPath = job.in.split(".");
      if (
        (red.getIn(inPath) != null && outValue != null) ||
        (inPath.length === 1 && inPath[0] === "")
      )
        return red;
      return red.setIn(inPath, outValue);
    }, Map())
    .toJS();
}

export function validateModel(jobs: ConversionJobs) {
  return function validateState(value?: ?Object, props: Object) {
    const immutableValue = fromJS(value);
    const wholeValidation = jobs.reduceRight((red, job) => {
      const outPath = job.out.split(".");
      const fieldValue = immutableValue.getIn(outPath);
      if (
        outPath.length === 1 &&
        outPath[0] === "" &&
        typeof job.validate === "function"
      )
        throw new Error(
          "You can't use validation if you don't have any out, either in the current node or a parent one. At " +
            job.in,
        );
      const validation =
        typeof job.validate === "function"
          ? job.validate(fieldValue, props)
          : true;
      if (
        validation === true ||
        validation === null ||
        validation === undefined
      ) {
        return red;
      } else {
        return (typeof red === "object" ? red : Map()).setIn(
          outPath,
          validation,
        );
      }
    }, true);

    if (typeof wholeValidation === "object") return wholeValidation.toJS();
    else return wholeValidation;
  };
}
