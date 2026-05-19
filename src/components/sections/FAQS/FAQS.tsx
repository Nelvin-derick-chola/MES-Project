import React, { useState } from 'react';
import { Container } from '../../layout/Container/Container';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import styles from './FAQS.module.css';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const FAQS: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([1]);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "How do I track my recent local packages?",
      answer: "Visit our tracking page on our website and enter your tracking number. (e.g., 0000352838). The tracking page provides up-to-date information on your shipment location and status.",
    },
    {
      id: 2,
      question: "When will my shipment arrive?",
      answer: "Delivery times vary based on the service selected and destination. Local deliveries typically take 1-3 business days, while international shipments may take 5-14 business days. You can track your shipment in real-time on our tracking page for the most accurate estimated delivery date.",
    },
    {
      id: 3,
      question: "What happens when my shipment is lost?",
      answer: "We have a dedicated team that manages claims and they effectively communicate with our clients in such instances. Please contact our customer support immediately with your tracking number, and our claims team will initiate an investigation and guide you through the claims process.",
    },
    {
      id: 4,
      question: "Do you offer customs clearance?",
      answer: "Yes. We have a whole department for clearing whose responsibility is to look into our client's needs. Our customs clearance team handles all documentation, duties, and taxes to ensure smooth international shipments.",
    },
    {
      id: 5,
      question: "What is the range of services for export?",
      answer: "We offer road freight, airfreight, express courier, and sea freight for export shipments. Our export services include door-to-door delivery, customs documentation, and real-time tracking.",
    },
    {
      id: 6,
      question: "What is the range of services for Import?",
      answer: "We offer road freight, sea freight, airfreight, and express courier for import shipments. Our import services include customs clearance, warehousing, and last-mile delivery.",
    },
    {
      id: 7,
      question: "What is the range of services for domestic courier?",
      answer: "We offer City courier, domestic distribution, domestic road freight, overnight freight, door to door pickup and delivery service, and same day delivery for domestic shipments within Zambia.",
    },
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className={styles.faqSection}>
      <Container>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <HelpCircle size={32} className={styles.headerIcon} />
          </div>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
          <p className={styles.subtitle}>
            Find answers to common questions about our shipping and logistics services
          </p>
        </div>

        <div className={styles.faqList}>
          {faqItems.map((item) => (
            <div 
              key={item.id} 
              className={`${styles.faqItem} ${openItems.includes(item.id) ? styles.active : ''}`}
            >
              <button
                className={styles.faqQuestion}
                onClick={() => toggleItem(item.id)}
                aria-expanded={openItems.includes(item.id)}
              >
                <span className={styles.questionText}>{item.question}</span>
                <span className={styles.icon}>
                  {openItems.includes(item.id) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              </button>
              <div className={styles.faqAnswer}>
                <div className={styles.answerContent}>
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};