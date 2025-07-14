
'use client';


// import Image from "next/image";
import Admin from "@/components/Admin/Admin";
import Link from "next/link";


export default function AdminPage() {


    return (
        <div>
            <Admin />
        </div>
    );
}


Admin.getLayout = function getLayout(page) {
    return page
  }