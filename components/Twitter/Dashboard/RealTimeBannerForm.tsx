import { BaseSyntheticEvent } from "react";
import {
  FieldValues,
  FormState,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

export const RealTimeBannerForm = ({
  register,
  handleSubmit,
  watch,
  formState,
}: {
  register: UseFormRegister<any>;
  handleSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  watch?: UseFormWatch<FieldValues>;
  formState?: FormState<FieldValues>;
}) => {
  return (
    <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6 card bg-base-300">
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-6">
          <div>
            <label className="label">
              <span className="label-text">Banner Background</span>
            </label>
            <div className="flex flex-wrap items-center justify-between mt-1 space-x-2">
              <select className="w-full max-w-xs select select-primary">
                <option value="gradient">Gradient</option>
                <option value="color">Plain Color</option>
                <option value="user">Current Banner</option>
                <option value="preset">Image Library</option>
              </select>
              <div className="flex items-center justify-end py-2 space-x-2">
                <div>
                  <div className="flex items-center justify-end py-2 space-x-2">
                    <div>
                      <button type="button" className="btn btn-primary">
                        Custom Background
                      </button>
                    </div>
                    <div className="w-40 sm:w-full">
                      <div
                        tabIndex={-1}
                        className="inline-block w-8 h-8 mx-1 border border-gray-400 rounded-full cursor-pointer border-1"
                        style={{
                          background:
                            "linear-gradient(135deg, rgb(0, 198, 255), rgb(0, 192, 255), rgb(0, 185, 255), rgb(0, 179, 255), rgb(0, 172, 255), rgb(0, 165, 255), rgb(0, 157, 255), rgb(0, 149, 255), rgb(0, 141, 255), rgb(0, 133, 255), rgb(0, 124, 255), rgb(0, 114, 255))",
                        }}
                      />
                      <div
                        tabIndex={-1}
                        className="inline-block w-8 h-8 mx-1 border border-gray-400 rounded-full cursor-pointer border-1"
                        style={{
                          background:
                            "linear-gradient(135deg, rgb(22, 160, 133), rgb(43, 167, 128), rgb(62, 173, 123), rgb(80, 179, 116), rgb(99, 185, 108), rgb(117, 190, 100), rgb(137, 194, 92), rgb(157, 199, 84), rgb(178, 202, 76), rgb(199, 205, 70), rgb(221, 207, 65), rgb(244, 208, 63))",
                        }}
                      />
                      <div
                        tabIndex={-1}
                        className="inline-block w-8 h-8 mx-1 border border-gray-400 rounded-full cursor-pointer border-1"
                        style={{
                          background:
                            "linear-gradient(135deg, rgb(211, 131, 18), rgb(168, 50, 121))",
                        }}
                      />
                      <div
                        tabIndex={-1}
                        className="inline-block w-8 h-8 mx-1 border border-gray-400 rounded-full cursor-pointer border-1 ring-4"
                        style={{
                          background:
                            "linear-gradient(135deg, rgb(123, 67, 151), rgb(138, 62, 148), rgb(151, 56, 143), rgb(164, 49, 137), rgb(176, 42, 129), rgb(187, 34, 120), rgb(196, 25, 110), rgb(204, 17, 99), rgb(211, 12, 88), rgb(216, 16, 75), rgb(219, 25, 62), rgb(220, 36, 48))",
                        }}
                      />
                      <div
                        tabIndex={-1}
                        className="inline-block w-8 h-8 mx-1 border border-gray-400 rounded-full cursor-pointer border-1"
                        style={{
                          background:
                            "linear-gradient(135deg, rgb(222, 97, 97), rgb(224, 87, 105), rgb(224, 77, 115), rgb(222, 68, 126), rgb(218, 61, 138), rgb(211, 56, 152), rgb(201, 56, 166), rgb(186, 59, 181), rgb(167, 64, 196), rgb(142, 71, 210), rgb(107, 79, 223), rgb(38, 87, 235))",
                        }}
                      />
                      <div
                        tabIndex={-1}
                        className="inline-block w-8 h-8 mx-1 border border-gray-400 rounded-full cursor-pointer border-1"
                        style={{
                          background:
                            "linear-gradient(135deg, rgb(36, 198, 220), rgb(0, 188, 219), rgb(0, 178, 218), rgb(0, 167, 216), rgb(0, 157, 213), rgb(0, 146, 209), rgb(0, 134, 204), rgb(0, 123, 197), rgb(36, 111, 190), rgb(56, 99, 180), rgb(70, 87, 169), rgb(81, 74, 157))",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:col-span-6">
          <label className="label">
            <span className="label-text">Text Color</span>
          </label>
          <div className="flex items-center justify-center mt-1 space-x-2 sm:justify-between">
            <div className="flex items-center justify-end space-x-2">
              <div className="flex items-center justify-end py-2 space-x-2">
                <div>
                  <button type="button" className="btn btn-secondary">
                    Custom Text
                  </button>
                </div>
                <div className="w-40 sm:w-full">
                  <div
                    tabIndex={-1}
                    className="inline-block w-8 h-8 mx-1 border border-gray-400 rounded-full cursor-pointer border-1"
                    style={{ background: "rgb(79, 128, 238)" }}
                  />
                  <div
                    tabIndex={-1}
                    className="inline-block w-8 h-8 mx-1 border border-gray-400 rounded-full cursor-pointer border-1"
                    style={{ background: "rgb(222, 61, 99)" }}
                  />
                  <div
                    tabIndex={-1}
                    className="inline-block w-8 h-8 mx-1 border border-gray-400 rounded-full cursor-pointer border-1 ring-4"
                    style={{ background: "rgb(242, 242, 242)" }}
                  />
                  <div
                    tabIndex={-1}
                    className="inline-block w-8 h-8 mx-1 border border-gray-400 rounded-full cursor-pointer border-1"
                    style={{ background: "rgb(183, 107, 75)" }}
                  />
                  <div
                    tabIndex={-1}
                    className="inline-block w-8 h-8 mx-1 border border-gray-400 rounded-full cursor-pointer border-1"
                    style={{ background: "rgb(17, 17, 17)" }}
                  />
                  <div
                    tabIndex={-1}
                    className="inline-block w-8 h-8 mx-1 border border-gray-400 rounded-full cursor-pointer border-1"
                    style={{ background: "rgb(143, 55, 246)" }}
                  />
                </div>
              </div>
            </div>
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
