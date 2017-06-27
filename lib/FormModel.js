// @flow

import { fromJS, List, Map } from "immutable";

export type ConversionModel = {
  out?: string,
  out_path?: string,
  default?: ?any,
  convertIn?: (value: any) => any,
  convertOut?: (value: any) => any,
  complex?: boolean,
  [key: string]: ConversionModel,
};

export type ConversionJob = {
  in: string,
  out: string,
  convertIn: (v: any) => any,
  convertOut: (v: any) => any,
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
  const currentNodeOutPath = "out" in model || "out_path" in model
    ? model.out || model.out_path
    : "";
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
            convertOut: "convertOut" in model
              ? model.convertOut
              : value => value,
            default: model.default,
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

export function convertIn(value?: ?Object, jobs: ConversionJobs): Object {
  if (value == null) return {};
  const immutableValue = fromJS(value);
  return jobs
    .reduceRight((red, job) => {
      const inValue = job.convertIn(
        immutableValue.getIn(job.in.split("."), job.default),
      );
      if (red.getIn(job.out.split(".")) != null && inValue != null) return red;
      return red.setIn(job.out.split("."), fromJS(inValue));
    }, Map())
    .toJS();
}

export function convertOut(
  value?: ?Object,
  jobs: ConversionJobs,
  props: any,
): Object {
  if (value == null) return {};
  const immutableValue = fromJS(value);
  return jobs
    .reduceRight((red, job) => {
      const outValue = job.convertOut(
        immutableValue.getIn(job.out.split(".")),
        props,
      );
      if (outValue === undefined) {
        return red;
      }
      if (red.getIn(job.in.split(".")) != null && outValue != null) return red;
      return red.setIn(job.in.split("."), outValue);
    }, Map())
    .toJS();
}
