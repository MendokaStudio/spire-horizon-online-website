// import { deleteCollectionInBatches } from "../services/firestoreService";

export const generateRandomString = (length = 32) => {
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map((b) => ("00" + b.toString(16)).slice(-2))
    .join("")
    .substring(0, length);
};

export const errorFormat = (errMsg) => {
  const message = errMsg.split(": ")[0];
  console.log(message);
  switch (message) {
    case "No document to update":
      return "Player not found!";
    default:
      return "Unknown Error!";
  }
};

export const formatItemDataToObject = (itemData) => {
  if (itemData == "") {
    return {};
  }

  let obj = {};

  itemData?.split(",").forEach((pair) => {
    let [key, value] = pair.split(":");
    obj[key] = value;
  });

  return obj;
};

export const downloadJson = async (fileUrl, fileName) => {
  const jsonUrl = new URL(fileUrl, import.meta.url).href;
  console.log(jsonUrl);
  try {
    // Fetch the JSON file from the assets directory
    const response = await fetch(jsonUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    // Convert the JSON data to a Blob
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);

    // Create an anchor element and trigger a download
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error fetching or downloading JSON:", error);
  }
};

export const AdminChecker = (uid) => {
  return (
    uid === import.meta.env.VITE_APP_ADMIN_UID_01 ||
    uid === import.meta.env.VITE_APP_ADMIN_UID_02 ||
    uid === import.meta.env.VITE_APP_ADMIN_UID_03
  );
};

export const IpChecker = (ip) => {
  return (
    ip === import.meta.env.VITE_APP_ADMIN_IP_01 ||
    ip === import.meta.env.VITE_APP_ADMIN_IP_02 ||
    ip === import.meta.env.VITE_APP_ADMIN_IP_03
  );
};
