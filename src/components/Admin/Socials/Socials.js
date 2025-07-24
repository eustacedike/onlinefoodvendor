


import Image from 'next/image';
import styles from './socials.module.css';

import facebookImg from '@/public/images/socials/facebook.png';
import instagramImg from '@/public/images/socials/instagram.png';
import locationImg from '@/public/images/socials/location.png';
import phoneImg from '@/public/images/socials/telephone.png';
import tiktokImg from '@/public/images/socials/tik-tok.png';
import twitterImg from '@/public/images/socials/twitter.png';
import youtubeImg from '@/public/images/socials/youtube.png';




export default function AdminSocials() {

    const icons = [facebookImg, instagramImg, locationImg, phoneImg, tiktokImg, twitterImg, youtubeImg]

    const socials = [
        { icon: 1, img: instagramImg, title: "Instagram", value: "aebis_menu" },
        { icon: 0, img: facebookImg, title: "Facebook", value: "aebis_menu" },
        { icon: 2, img: locationImg, title: "Location", value: "13 Yaba, Lagos Mainland" },
        { icon: 3, img: phoneImg, title: "Phone", value: "070312345678" },
        { icon: 4, img: tiktokImg, title: "Tik Tok", value: "aebis_menu" },
        { icon: 5, img: twitterImg, title: "Twitter", value: "aebis_menu" },
        { icon: 6, img: youtubeImg, title: "YouTube", value: "aebis_menu" },
    ]

    return (
        <div className={styles.socialsMain}>

            {socials.map((social) => (
                <div className={styles.social} key={social.icon}>
                    <div className={styles.imageContainer}>
                        <Image src={icons[social.icon]} alt={social.title} fill objectFit="contain" />
                    </div>

                    <div className={styles.inputGroup}>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name='username'
                            // value={newproductData.name}
                            // onChange={(e) => setNewProductData({ ...newproductData, name: e.target.value })}
                            // placeholder="eg: Pasta"
                            // required
                            />
                        </div>

                        <div>
                            <label htmlFor="category">Show/Hide</label>
                            <select
                            // value={newproductData.category}
                            // onChange={(e) => setNewProductData({ ...newproductData, category: e.target.value })}
                            // required
                            >
                                <option value={true}>Show</option>
                                <option value={false}>Hide</option>

                            </select>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )



}