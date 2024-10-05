"use client";
import React from "react";

const RightAside = () => {
  return (
    <aside>
      <div className="bg-gray-200 p-4 md:col-span-1 shadow-md sm:max-h-[20vh] md:max-h-full mb-4">
        <div className="flex items-center mt-4 space-x-3">
          <img
            src="https://marketingweek.imgix.net/content/uploads/2016/07/29160619/internet-ad.png?auto=compress,format&q=60&w=736&h=451"
            alt="Author"
          />
        </div>
      </div>
      <div className="bg-gray-200 p-4 md:col-span-1 shadow-md sm:max-h-[20vh] md:max-h-full mb-4">
        <div className="flex items-center mt-4 space-x-3">
          <img
            src="https://marketingweek.imgix.net/content/uploads/2016/07/29160619/internet-ad.png?auto=compress,format&q=60&w=736&h=451"
            alt="Author"
          />
        </div>
      </div>
    </aside>
  );
};

export default RightAside;
