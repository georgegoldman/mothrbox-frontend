import { useEffect, useState, useRef } from "react";
// Import the init function and all exported methods from your WASM package
import initWasm, {
  ecc_generate_key,
  ecc_encrypt,
  ecc_decrypt,
  aes_encrypt,
  aes_decrypt,
  chacha_encrypt,
  chacha_decrypt,
} from "mothrbox-wasm";

export const useMothrbox = () => {
  const [isReady, setIsReady] = useState(false);
  const initializing = useRef(false);

  useEffect(() => {
    // Prevent double-initialization in React Strict Mode
    if (initializing.current) return;
    initializing.current = true;

    initWasm()
      .then(() => setIsReady(true))
      .catch((err) => console.error("❌ Mothrbox WASM Failed:", err));
  }, []);

  return {
    isReady,
    ecc_generate_key,
    ecc_encrypt,
    ecc_decrypt,
    aes_encrypt,
    aes_decrypt,
    chacha_encrypt,
    chacha_decrypt,
  };
};
