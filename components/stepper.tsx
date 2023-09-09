"use client";
import { Stepper as RStepper } from "react-form-stepper";

type Step = {
  label: string;
  active?: boolean;
  completed?: boolean;
};
type Props = {
  steps: Array<Step>;
  activeStep: number;
};
export const Stepper = ({ steps, activeStep }: Props) => {
  const datas = steps.map((step, i) => {
    if (i === activeStep) {
      return { ...step, active: true };
    }
    return step;
  });
  return <RStepper steps={datas} activeStep={activeStep} />;
};
