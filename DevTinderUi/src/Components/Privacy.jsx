import React from "react";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
     
      {/* Privacy content at the bottom */}
      <div className="bg-gray-900 text-white px-6 py-4">
        <h1 className="font-bold text-xl mb-2">Privacy Policy</h1>
        <p className="text-sm leading-6">
          At DevHub, we respect your privacy and are committed to protecting your
          personal information. We collect data you provide—such as your username,
          email, profile details, and chat messages—as well as technical data like
          your IP address and usage patterns. This information helps us operate
          the app, match developers, and improve your experience. We do not sell
          your data, and we only share it with trusted service providers or when
          legally required. You can edit or delete your data anytime, and we take
          reasonable security measures to keep your information safe. By using
          DevHub, you consent to this data collection and use as described. For
          any questions or to exercise your data rights, contact us at{" "}
          <a
            href="mailto:support@devhub.com"
            className="text-blue-400 hover:underline"
          >
            support@devhub.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Privacy;
