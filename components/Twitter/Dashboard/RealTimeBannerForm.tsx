import { BaseSyntheticEvent, Dispatch, SetStateAction } from "react";
import {
  FieldValues,
  FormState,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { ColorPickerType, useColorPicker } from "@/hooks/useColorPicker";
export const RealTimeBannerForm = ({
  register,
  handleSubmit,
  watch,
  formState,
  colorPicker,
}: {
  register: UseFormRegister<any>;
  handleSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  watch?: UseFormWatch<FieldValues>;
  formState?: FormState<FieldValues>;
  colorPicker: ColorPickerType;
}) => {
  return (
    <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6 card bg-base-300">
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        {colorPicker.colorPicker()}
        <div className="sm:col-span-6">
          <div>
            <label className="label">
              <span className="label-text">Banner Background</span>
            </label>
          </div>
        </div>

        <div className="sm:col-span-6">
          <div className="flex items-center justify-center mt-1 space-x-2 sm:justify-between">
            <div className="flex gap-2 form-control">
              <label className="gap-2 cursor-pointer label">
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked
                  readOnly
                />
                <span className="label-text">Show Watermark</span>
              </label>
            </div>
          </div>
        </div>
        <div className="sm:col-span-6">
          <div className="w-full form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              placeholder="Title Placeholder"
              className="w-full input input-bordered"
              {...register("title", { required: false })}
            />
          </div>
        </div>
        <div className="sm:col-span-6">
          <div className="w-full form-control">
            <label className="label">
              <span className="label-text">Subtitle</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="w-full input input-bordered"
              {...register("subtitle", { required: false })}
            />
          </div>
        </div>
        <div className="sm:col-span-6">
          <div className="w-full form-control">
            <label className="label">
              <span className="label-text">Follow Text</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="w-full input input-bordered"
              {...register("followText", { required: false })}
            />
          </div>
        </div>
        <input type="submit" className="btn btn-success" />
      </div>
    </form>
  );
};
