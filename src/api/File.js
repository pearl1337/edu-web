import axios from "../axios/";

export async function downloadFiles(answerID, archiveName) {
  try {
    const response = await axios.get(`/files/answer/${answerID}`, {
      responseType: "blob",
    });
    const { data: blob } = response;
    const downloadURL = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadURL;
    link.download = archiveName + ".zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadURL);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
