"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { User } from "../../../../types/user";
import { DetailRow } from "../../../../components/DetailRow";

export default function UserDetailsPage() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`https://localhost:7227/api/users/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("User not found");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-6">Loading user details...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6 fade-in">
      <button
        onClick={() => router.back()}
        className="text-white bg-slate-600 p-2 rounded hover:bg-slate-700 cursor-pointer transition"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-1" /> Back
      </button>

      <h1 className="text-2xl font-bold my-10">User Details</h1>
      <div className="space-y-2">
        <DetailRow label="ID" value={user.id} />
        <DetailRow label="Username" value={user.username} />
        <DetailRow label="Email" value={user.email} />
        <DetailRow label="Role" value={user.role} />
        <DetailRow label="Created At" value={user.createdAt} />
      </div>
    </div>    
  );
}
