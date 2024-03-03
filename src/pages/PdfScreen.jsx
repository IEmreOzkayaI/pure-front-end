import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import CustomModal from "../components/CustomModal";

const PdfScreen = () => {
  const [pdf, setPdf] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/user/individual_user/cv/fcc6aec2-7296-4352-be9a-052a1456c2de`, {
          method: "GET",
          headers: {
            "Content-Type": "application/pdf",
          },
        });
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        console.log("PDF URL:", url); // Log PDF URL for debugging
        setPdf(url);
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    };

    fetchPdf();
  }, []);

  console.log("PDF State:", pdf); // Log PDF state for debugging

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1>PDF Screen</h1>
      <div>
        <button onClick={() => setShowModal(true)}>See PDF</button>
      </div>

      <CustomModal isOpen={showModal} setIsOpen={setShowModal}>
        {pdf && <iframe src={pdf} title="resume.pdf" style={{ width: "100%", height: "100%" }} />}
      </CustomModal>
    </motion.div>
  );
};

export default PdfScreen;
