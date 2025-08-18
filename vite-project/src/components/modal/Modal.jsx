import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { motion } from "framer-motion";

function InputField({ label, id, value, onChange, type = "text", required = true }) {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 bg-gray-100"
        required={required}
      />
    </div>
  );
}

export default function Modal({
  name,
  address,
  pincode,
  phoneNumber,
  setName,
  setAddress,
  setPincode,
  setPhoneNumber,
  buyNow,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger button */}
      <div className="text-center">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-violet-600 py-2 rounded-lg text-white font-bold hover:bg-violet-700 transition"
        >
          Buy Now
        </button>
      </div>

      {/* Modal */}
      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          {/* Backdrop */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" />
          </Transition.Child>

          {/* Modal content */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child as={Fragment}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-full max-w-md rounded-2xl bg-gray-50 p-6 shadow-2xl"
              >
                <Dialog.Title className="text-lg font-semibold text-gray-900 text-center mb-4">
                  Enter Shipping Details
                </Dialog.Title>

                <form className="space-y-4">
                  <InputField label="Enter Full Name" id="name" value={name} onChange={setName} />
                  <InputField label="Enter Full Address" id="address" value={address} onChange={setAddress} />
                  <InputField label="Enter Pincode" id="pincode" value={pincode} onChange={setPincode} />
                  <InputField
                    label="Enter Mobile Number"
                    id="mobileNumber"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    type="tel"
                  />
                </form>

                <div className="mt-6 space-y-2">
                  <button
                    onClick={() => {
                      buyNow();
                      setIsOpen(false);
                    }}
                    className="w-full bg-violet-600 hover:bg-violet-800 text-white font-medium rounded-lg text-sm px-5 py-2.5 transition"
                  >
                    Order Now
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 transition"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
