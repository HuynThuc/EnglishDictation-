import React from 'react';

const Helpme = () => {
  return (
    <div className="max-w-7xl mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Support dailydictation.com</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <p className="mb-4">
            Hello friends! I'm Huy from Vietnam. I am the founder of dailydictation.com 😊
          </p>
          <p className="mb-4">
            As a person who has used many different methods to learn English, I realized that dictation is an amazing way to improve my English. That's why I created this website: to help all English learners practice easily and effectively.
          </p>
          <p className="mb-4">
            Building and maintaining a website takes time, money, and effort. I need your help to keep the site running and to add more useful features.
          </p>
          <p className="mb-4">
            If you can help me with money, awesome 😊 You can send me a donation to my PayPal / bank accounts (see below).
          </p>
          <p className="mb-4">
            Another great way to help me is to share this website with your friends. 😊
          </p>
          <p className="mb-4 font-semibold">I sincerely appreciate your support! Thank you!!!</p>
          
          <p className="mt-6 text-sm text-gray-600">
            If you want to send me a donation, <span className="font-bold">please mention your username or email</span>, I will disable ads for your account.
          </p>
          
          <div className="mt-4">
            <p className="font-semibold">Payment Methods:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>PayPal or Credit/Debit Card: <a href="https://paypal.me/HuyVietnam" className="text-blue-500 hover:underline">https://paypal.me/HuyVietnam</a></li>
              <li>Vietcombank: 0978999999 (Nguyen Huy)</li>
              <li>MoMo: 0978999999 (Nguyen Huy)</li>
              <li>Bitcoin address: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</li>
              <li>USDT: 0xAdBdE69b181b40011d5Bc9b8E1C3dEE3e2</li>
            </ul>
          </div>
        </div>
        
        <div className="md:w-1/3">
          <img src="./help-me.jpg" alt="Thank You" className="rounded-lg shadow-md" />
        </div>
      </div>
      
      <div className="mt-10">
        <p className="text-gray-600 text-sm">
          All the donations I have received are listed <a href="/donate" className="text-blue-500 hover:underline">HERE</a>.
        </p>
        
        <table className="w-full mt-4 text-sm border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border border-gray-300">Date</th>
              <th className="p-2 border border-gray-300">Name</th>
              <th className="p-2 border border-gray-300">Amount</th>
              <th className="p-2 border border-gray-300">Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {/* Example donation entries */}
            <tr>
              <td className="p-2 border border-gray-300">2024-10-13</td>
              <td className="p-2 border border-gray-300">Hưng</td>
              <td className="p-2 border border-gray-300">$4.00</td>
              <td className="p-2 border border-gray-300">Vietcombank</td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-300">2024-10-13</td>
              <td className="p-2 border border-gray-300">Tran My</td>
              <td className="p-2 border border-gray-300">$5.00</td>
              <td className="p-2 border border-gray-300">MoMo</td>
            </tr>
            {/* More donation entries as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Helpme;