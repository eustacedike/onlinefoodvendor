


import Image from 'next/image';
import styles from './socials.module.css';
import { useState } from 'react';
// import { useComponents } from '@/hooks/useComponents';

import { updateSocials } from '@/actions/socials';

import facebookImg from '@/public/images/socials/facebook.png';
import instagramImg from '@/public/images/socials/instagram.png';
import locationImg from '@/public/images/socials/location.png';
import phoneImg from '@/public/images/socials/telephone.png';
import tiktokImg from '@/public/images/socials/tik-tok.png';
import twitterImg from '@/public/images/socials/twitter.png';
import youtubeImg from '@/public/images/socials/youtube.png';




export default function AdminSocials({socials}) {

    // const { socials, components } = useComponents();

    const icons = [locationImg, phoneImg, facebookImg, instagramImg, tiktokImg, twitterImg, youtubeImg]

    const [newSocials, setNewSocials] = useState(socials);
    // const socials = [
    //     { icon: 0, img: locationImg, title: "Location", value: "13 Yaba, Lagos Mainland" },
    //     { icon: 1, img: phoneImg, title: "Phone", value: "070312345678" },
    //     { icon: 3, img: instagramImg, title: "Instagram", value: "aebis_menu" },
    //     { icon: 2, img: facebookImg, title: "Facebook", value: "aebis_menu" },

    //     { icon: 4, img: tiktokImg, title: "Tik Tok", value: "aebis_menu" },
    //     { icon: 5, img: twitterImg, title: "Twitter", value: "aebis_menu" },
    //     { icon: 6, img: youtubeImg, title: "YouTube", value: "aebis_menu" },
    // ]
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    
    const handleUpdate = async () => {
      const changed = newSocials.filter(s => {
        const original = socials.find(o => o.icon === s.icon);
        return s.value !== original.value || s.show !== original.show;
      });
    
      if (changed.length === 0) {
        setError("No changes detected.");
        setSuccess('');
        return;
      }
    
      const result = await updateSocials(changed);
    
      const hasFailure = result.some(r => r.success === false);
    
      if (hasFailure) {
        setError("Some updates failed.");
        setSuccess('');
      } else {
        setSuccess("Updated successfully.");
        setError('');
      }
    };
    
    // console.log(components);

    return (
        <div className={styles.socialsMain}>

            {newSocials?.map((social) => (
                <div className={styles.social} key={social.icon}>
                    <div className={styles.imageContainer}>
                        <Image src={icons[social.icon]} alt={social.id} fill objectFit="contain" />
                    </div>

                    <div className={styles.inputGroup}>
                        <div>
                            <label htmlFor="username">
                                {social.id}
                                {/* {social.id === "Location" ? "Address" : social.id === "Phone" ? "Phone" : "UserName"} */}
                            </label>
                            <input
                                type="text"
                                id="username"
                                name='username'
                                value={social.value}
                                onChange={e => 
                                    setNewSocials(prev =>
                                        prev.map(s => s.id === social.id ? { ...s, value: e.target.value } : s)
                                    )
                                }
                            // placeholder="eg: Pasta"
                            // required
                            />
                        </div>

                        <div>
                            <label htmlFor="category">Show/Hide</label>
                            <select
                            value={social.show}
                            onChange={e => 
                                setNewSocials(prev =>
                                    prev.map(s => s.id === social.id ? { ...s, show: e.target.value } : s)
                                )
                            }
                            >
                                <option value={true}>Show</option>
                                <option value={false}>Hide</option>

                            </select>
                        </div>
                    </div>
                </div>
            ))}
            <button
               onClick={handleUpdate}

                className={styles.saveButton}

            >
                Save All Changes
            </button>

            {success && <p className={styles.success}>{success}</p>}
{error && <p className={styles.error}>{error}</p>}
        </div>
    )



}