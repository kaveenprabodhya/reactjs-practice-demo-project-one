import { useEffect } from "react";

function useDocumentFile(title) {
  useEffect(() => {
    document.title = title;
    return () => {
      console.log("Clean Up");
    };
  });
}

export default useDocumentFile;
