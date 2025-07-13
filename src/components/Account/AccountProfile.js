

import Image from "next/image";
import styles from "./profile.module.css";
import { useState, useEffect, useRef } from "react";
import { createClient } from '@/utils/supabase/client'; // must use client here
import { useRouter, useSearchParams } from 'next/navigation';
// import { useSearchParams } from "next/navigation";

import Orders from "../Orders/Orders";
import { useOrderContext } from "@/context/OrderContext";
import DataFetch from "@/context/datafetch";
// import avatarImg from "@/public/images/eustace.jpg";
import avatar1 from "@/public/images/avatar/avatar1.jpg";
import avatar2 from "@/public/images/avatar/avatar2.jpg";
import avatar3 from "@/public/images/avatar/avatar3.jpg";
import avatar4 from "@/public/images/avatar/avatar4.jpg";
import avatar5 from "@/public/images/avatar/avatar5.jpg";
import avatar6 from "@/public/images/avatar/avatar6.jpg";


import { MdDeleteForever } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

// import locationImg from '@/public/images/socials/location.png';
// import phoneImg from '@/public/images/socials/telephone.png';
// import mailImg from '@/public/images/socials/mail.png';

import { updateAvatar, updatePhone, addAddress, deleteAddress, setPreferredAddress } from "@/actions/profileActions";
import { logout } from '@/actions/auth';


export default function AccountProfile() {

    const [user, setUser] = useState(null);

    const [selected, setSelected] = useState(null);
    const [avatarEdit, setAvatarEdit] = useState(false);
    const [phoneEdit, setPhoneEdit] = useState(false);
    const [phoneNo, setPhoneNo] = useState("");
    const [addressEdit, setAddressEdit] = useState(false);
    const [newAddress, setNewAddress] = useState("");

    const [refreshCount, setRefreshCount] = useState(0);
    // ✅ Call this after any of your actions to trigger a re-fetch
    const triggerRefetch = () => setRefreshCount((prev) => prev + 1);

    // const searchParams = useSearchParams();
    const router = useRouter()

    useEffect(() => {
        // const reload = searchParams.get('reload')
        const params = new URLSearchParams(window.location.search);
        const reload = params.get('reload');
        if (reload === 'true') {
            // First clean the URL
            const url = new URL(window.location.href)
            url.searchParams.delete('reload')
            window.history.replaceState({}, '', url.toString())

            // Then reload once
            window.location.reload()
        }
    }, [router])

    // const router = useRouter();

    useEffect(() => {
        const supabase = createClient()

        const fetchProfile = async () => {
            const { data: userData, error: userError } = await supabase.auth.getUser()

            if (userError || !userData?.user) {
                router.push('/login')
                return
            }

            // Now fetch the profile by user ID
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*') // or list specific fields
                .eq('id', userData.user.id)
                .single()

            if (profileError) {
                console.error(profileError)
                return
            }

            setUser(profileData)
            setPhoneNo(profileData.phone)
        }

        fetchProfile()
    }, [avatarEdit, phoneEdit, refreshCount])




    const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

    // const [user, setUser] = useState({
    //     avatar: 3,
    //     name: "John Doe",
    //     email: "john@example.com",
    //     verified: true,
    //     phone: "08031234567",
    //     addresses: [
    //         { place: "Beverly Hills, California, USA", lat: 6.3790, long: 3.5491 },
    //         { place: "13B Car Wash Street, Gbagada", lat: 6.5578, long: 3.3015 },
    //         { place: "Mumbai, India", lat: 6.6823, long: 3.1955 },
    //     ],
    // });

    const { orders } = useOrderContext();

    const modalRef = useRef(null);



    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setAvatarEdit(false);
            }
        }

        // Attach listener only when modal is open
        if (avatarEdit) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [avatarEdit]);

    //   console.log(profile)


    return (





        <div className={styles.container}>
            <DataFetch />

            <div ref={modalRef} className={styles.avatarModal} style={{ display: avatarEdit ? null : "none" }}>
                <span onClick={() => setAvatarEdit(false)} style={{ cursor: "pointer" }}>&#10060; </span>
                <div>
                    {avatars.map((av, index) => {
                        return <Image className={styles.avatarModalImg}
                            key={index}
                            src={av}
                            alt=""
                            width={0}
                            height={0}
                            sizes="60vw"
                            onClick={() => setSelected(index)}
                            style={{ border: selected === index ? "4px solid var(--primary-color)" : null }}

                        />
                    }

                    )}
                </div> <br />
                <button onClick={() => { updateAvatar(selected, user.id); setAvatarEdit(false) }}>Save</button>
            </div>

            <div className={styles.profile}>
                <div className={styles.header}>
                    <h2>{user?.name}</h2>
                    <div className={styles.actions}>
                        {/* <button>Edit Profile</button> */}
                        <button onClick={() => logout()}>Logout</button>
                    </div>
                </div>

                <div className={styles.section}>
                    <span className={styles.avatarHover}>

                        <button className={styles.changeAvatar} onClick={() => setAvatarEdit(true)}>Change</button>
                    </span>
                    <Image className={styles.avatar}
                        src={avatars[user?.avatar]}
                        alt=""
                        width={0}
                        height={0}
                        sizes="60vw"

                    />

                    <div className={styles.details}>

                        <h4>Phone</h4>
                        <hr />
                        {/* <div className={styles.detail}>
                            <input
                                value={phoneNo}
                                disabled={!phoneEdit}
                                style={{ border: phoneEdit ? "2px solid var(--primary-color)" : null }}
                                onChange={(e) => setPhoneNo(e.target.value)}
                            // {phoneEdit? disabled : ""}
                            />
                            {phoneEdit ?
                                <button
                                    className={styles.editBtn} style={{ backgroundColor: "limegreen" }}
                                    onClick={() => { updatePhone(phoneNo, user.id); setPhoneEdit(false) }}
                                >Save</button> :
                                <button className={styles.editBtn} onClick={() => setPhoneEdit(true)}>Edit</button>
                            }

                        </div> */}
                        {phoneEdit ?
                            (<div className={styles.detail}>
                                <input
                                    value={phoneNo}
                                    style={{ border: "2px solid var(--primary-color)" }}
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                />

                                <button
                                    className={styles.editBtn} style={{ backgroundColor: "limegreen", color: "white" }}
                                    onClick={() => { updatePhone(phoneNo, user.id); setPhoneEdit(false) }}
                                >Save</button>
                            </div>)
                            :
                            (<div className={styles.detail}>
                                <p>{phoneNo}</p>
                                <button className={styles.editBtn} onClick={() => setPhoneEdit(true)}>Edit</button>

                            </div>)
                        }

                        <br />

                        <h4>Email Address</h4>
                        <hr />
                        <div className={styles.detail}>

                            {/* <input
                                value={user?.email || ''}
                                disabled
                            /> */}
                            <p>{user?.email || ''}</p>
                            {/* {
                                user?.verified ? <button style={{ backgroundColor: "limegreen" }} className={styles.editBtn}>Verified </button> :
                                    <button className={styles.editBtn}>Verify</button>
                            } */}

                        </div>

                        <br />


                        <div className={styles.detail}>
                            <h4>Delivery Addresses</h4>
                            <button
                                className={styles.editBtn}
                                style={{ display: user?.addresses.length >= 3 ? "none" : null }}
                                onClick={() => setAddressEdit(true)}
                            >Add New..</button>
                        </div>
                        <hr />
                        {addressEdit ?
                            <div>

                                <div className={styles.detail}>
                                    <input
                                        value={newAddress}
                                        // disabled={!phoneEdit}
                                        style={{ border: "2px solid var(--primary-color)" }}
                                        onChange={(e) => setNewAddress(e.target.value)}
                                    />
                                    <button
                                        className={styles.editBtn} style={{ backgroundColor: "limegreen", color: "white"  }}
                                        onClick={() => { addAddress(newAddress, user.id); setAddressEdit(false) }}
                                    >Save</button>
                                </div>

                                <label style={{ marginBottom: "20px" }}>
                                    <input
                                        type='checkbox'
                                    // checked={useCurrentLocation}
                                    // onChange={handleCheckbox}
                                    />{' '}
                                    Use Current Location
                                </label>

                            </div> :
                            null
                        }


                        {user?.addresses.map((address, index) => (
                            <div className={styles.detail} key={index}>
                                <p>{address.place}</p>
                                {index === 0 ?
                                    <span style={{ color: "limegreen", cursor: "pointer" }}> <IoIosCheckmarkCircle /></span> :
                                    <span
                                        style={{ color: "black", cursor: "pointer" }}
                                        onClick={() => { setPreferredAddress(index, user.id); triggerRefetch() }}
                                    > <IoIosCheckmarkCircleOutline /></span>}
                                <button
                                    className={styles.deleteBtn}
                                    onClick={() => { deleteAddress(index, user.id); triggerRefetch() }}
                                ><MdDeleteForever /></button>
                            </div>
                        ))}




                    </div>



                </div>
            </div>

            <div className={styles.history}>
                <Orders orders={orders.filter(order => order.owner === user?.email)} />
            </div>
        </div>

    );
}
