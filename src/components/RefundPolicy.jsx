import { RotateCw } from "lucide-react";

export default function RefundPolicy() {
  return (
    <div className="p-4 mt-12">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-2">
        Refund Policy
      </h1>
      <p className="text-gray-500 text-center mb-8">
        We guard your secrets like we guard the remote.
      </p>

      {/* Updated Date */}
      <div className="max-w-7xl rounded-4xl bg-neutral-200 items-center justify-center mx-auto p-8 shadow-md">
        <div className="">
          <p className="text-gray-400 flex text-sm mb-6">
            <RotateCw size={20} className="mr-2" />
            Updated as of&nbsp;
            <span className="font-medium">September 17, 2025</span>
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {/* Section 1 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              We Keep Secrets Better Than We Keep Track of Our Glasses
            </h2>
            <p className="text-gray-700">
              At Grumpy Gramps, your personal information is safe with us —
              safer than the TV remote hidden from the grandkids. We don’t sell,
              trade, or share your details with strangers, nosy neighbors, or
              anyone who might use it to send you spam. Your trust means more to
              us than our afternoon nap, and that’s saying something.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              No Snooping — We Leave That to the Grandkids
            </h2>
            <p className="text-gray-700">
              We only collect the information we need to make your shopping
              experience smooth, like your name, address, and payment details.
              We don’t go digging through your personal life, and we certainly
              don’t care what you had for breakfast. We’re here to sell you
              great stuff, not to pry.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Your Data’s Locked Up Tighter Than Grampa’s Shed
            </h2>
            <p className="text-gray-700">
              We use secure systems and encryption to protect your information
              from hackers, scammers, and anyone else who thinks they’re clever.
              Just like Grampa’s shed, only those with the right key (or
              password) can get in — and even then, we keep a close eye on
              things.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              We Don’t Hold On Forever (Unlike Old Newspapers)
            </h2>
            <p className="text-gray-700">
              We keep your information only as long as we need it to process
              orders, handle returns, or meet legal requirements. Once it’s no
              longer needed, we let it go — unlike that stack of newspapers from
              1937 in the garage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
