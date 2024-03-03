import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

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
        setPdf(url);
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    };

    fetchPdf();
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

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

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
              style={{
                width: "50%",
                maxWidth: "100%",
                height: "80%",
                backgroundColor: "white",
                padding: 20,
                borderRadius: 8,
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
              }}
            >
              <button onClick={closeModal} style={{ float: "right" }}>
                Close
              </button>
              {pdf && <iframe src={pdf} title="resume.pdf" style={{ width: "100%", height: "100%" }} />}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PdfScreen;
