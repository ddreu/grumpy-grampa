import { RotateCw } from "lucide-react";
import { termsOfService } from "../lib/policies"; // import your terms data

export default function TermsOfService() {
  return (
    <div className="p-4 mt-12">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-2">
        {termsOfService.title}
      </h1>
      <p className="text-gray-500 text-center mb-8">
        {termsOfService.subtitle}
      </p>

      {/* Updated Date */}
      <div className="max-w-7xl rounded-4xl bg-neutral-200 items-center justify-center mx-auto p-8 shadow-md">
        <p className="text-gray-400 flex text-sm mb-6">
          <RotateCw size={20} className="mr-2" />
          Updated as of&nbsp;
          <span className="font-medium">{termsOfService.updated}</span>
        </p>

        {/* Sections */}
        <div className="space-y-10">
          {termsOfService.sections.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {section.heading}
              </h2>
              <p className="text-gray-700">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
