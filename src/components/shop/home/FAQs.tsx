'use client';
import React, { Fragment, useState, useEffect } from 'react';

const FAQs: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClick = () => {
    const phoneNumber = '919900204243'; // Replace with your phone number in international format, e.g., 1234567890 for +1 234 567 890
    const message = 'Hi Pran Motors, I need help for';
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const [isHovered, setIsHovered] = useState(false);
  const [showAnswer, setShowAnswer] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(isClient && window.innerWidth <= 768);
    };

    handleResize(); // Set the initial value
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleAnswer = (index: number) => {
    setShowAnswer(showAnswer === index ? null : index);
  };

  const faqs = [
    {
      question: 'When and where can I take a test drive?',
      answer:
        'With our test drive booking form, you can conveniently schedule a test drive at home or visit our hub to try out multiple cars. Once you book your preferred option, our relationship manager will call you to confirm the details before arriving at your location. To know more about home test drives, please click on the following link.',
    },
    {
      question: 'What’s the process for booking my car?',
      answer:
        "You can book an Assured & Budget car of your liking for up to 5 days by placing a refundable deposit of Rs. 20,000. Similarly, for Pran Motors Select cars, it's Rs. 50,000. If you complete the vehicle purchase within the holding period, the deposit will be applied toward the purchase; otherwise, it will be refunded to you, and the booking will be cancelled.",
    },
    {
      question: 'Will Pran Motors help me with car finance?',
      answer:
        'Absolutely, buyers can choose to avail financing through Pran Motors wherein we would get the loan processed through our finance partners. Our established partnerships help us process loans faster and get our customers better interest rates. Depending on your credit worthiness, you can avail used car loans through Pran Motors at interest rates as low as 12.5% compared to the market rates of 14-16%.',
    },
    {
      question: "How does Pran Motors's money back guarantee work?",
      answer:
        "At Pran Motors we are only happy when you’re happy. So if you don't absolutely love your new Pran Motors car you can return it back within 5 days and up to 300km of running (from the date of delivery) and your complete purchase amount will be refunded back to you within 7-9 working days, no-questions-asked.",
    },
  ];

  return (
    <Fragment>
      <div className="flex flex-col text-gray-700 px-8 py-2 justify-center">
        <div className="flex flex-row justify-center items-center space-x-2 pb-8 lg:pb-16">
          {!isMobile && (
            <div
              style={{
                width: '330px',
                height: '1px', // Adjust height as needed
                background: 'linear-gradient(to right, transparent, gray)', // Fading effect
              }}
            ></div>
          )}
          <p className="text-2xl font-bold text-center">
            Frequently Asked Questions
          </p>
          {!isMobile && (
            <div
              style={{
                width: '330px',
                height: '1px', // Adjust height as needed
                background: 'linear-gradient(to left, transparent, gray)', // Fading effect
              }}
            ></div>
          )}
        </div>
        <ul className="lg:px-12 space-y-4">
          {faqs.map((faq, index) => (
            <li
              key={index}
              onClick={() => toggleAnswer(index)}
              className="cursor-pointer"
            >
              <div className="flex justify-between flex-row border-b-2">
                <p className="p-2 font-bold" style={{ cursor: 'pointer' }}>
                  {faq.question}
                </p>
                <button>
                  {showAnswer === index ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-caret-up-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-caret-down-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                  )}
                </button>
              </div>
              {showAnswer === index && <p className="p-2">{faq.answer}</p>}
            </li>
          ))}
        </ul>
        <div className="p-4 mt-4 justify-center flex">
          <button
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ background: isHovered ? '#32012F' : '#f71979' }}
            className="p-4 rounded-md text-white hover:bg-gray-500"
          >
            Need Help
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default FAQs;
