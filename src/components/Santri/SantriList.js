"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
export default function SantriList(props) {
  const [santri, setSantri] = useState([]);
  const getSantri = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/santri`);
      setSantri(response.data.data.data);
      console.log(response.data.data.data);
    } catch (error) {
      console.log(error.messsage);
    }
  };
  // Delete santri
  const deleteSantri = async (res) => {
    let hapusSantri = ("Apakah anda ingin menghapus santri?");
    if (confirm(hapusSantri)){
      try {
        const response = await axios.delete(
          `http://localhost:8000/api/santri/${res}`
        );
        getSantri();
        // Handle the response after deleting the item
        // console.log(response.data);
      } catch (error) {
        // Handle any errors that occur during the request
        console.error(error);
      }
    }
  };
  useEffect(() => {
    getSantri();
  }, []);

  return (
    <>
      <div>
        <table className="table table-hover">
          <thead className="min-w-full divide-y divide-gray-200">
            <tr>
              <th scope="col" className="px-6 py-2">
                ID
              </th>
              <th scope="col" className="px-6 py-2">
                Nama
              </th>
              <th scope="col" className="px-6 py-2">
                Jenis Kelamin
              </th>
              <th scope="col" className="px-6 py-2">
                Status
              </th>
              <th scope="col" className="px-6 py-2">
                Kamar
              </th>
              <th scope="col" className="px-6 py-2">
                Divisi
              </th>
              <th scope="col" className="px-6 py-2">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {santri.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td><img src={`http://localhost:8000/storage/santri/${post.gambar}`} width={200} height={200}/></td>
                <td>{post.nama}</td>
                <td>{post.gender}</td>
                <td>{post.status}</td>
                <td>{post.room}</td>
                <td>{post.division}</td>
                <td className="text-center">
                  {/* edit santri */}
                  <Link href={`/dashboard/santri/edit/${post.id}`}>
                    <button
                      tabIndex="-1"
                      type="button"
                      className="mx-1 px-4 py-2 text-sm text-white bg-success rounded"
                    >
                      Edit
                    </button>
                  </Link>
                  {/* delete santri */}
                  <button
                    onClick={() => deleteSantri(post.id)}
                    tabIndex="-1"
                    type="button"
                    className="mx-1 px-4 py-2 text-sm text-white bg-danger rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
