"use client";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="bg-slate-600 text-white text-sm px-2 py-2 rounded hover:bg-slate-700 cursor-pointer hover:transition"
    >
      <FontAwesomeIcon icon={faRightToBracket} className="mr-1" /> Back
    </button>
  );
}
