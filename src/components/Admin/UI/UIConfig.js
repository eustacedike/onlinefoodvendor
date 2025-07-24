

// import Image from "next/image";
import styles from "./uiConfig.module.css";

import { useState } from "react";

import { useComponents } from "@/hooks/useComponents";

// import logo from "@/public/images/logo.png";

// icons
import { LuHeading1, LuHeading2 } from "react-icons/lu";
import { IoMdImage, IoMdImages } from "react-icons/io";
import { PiTextAaFill, PiTextAaLight } from "react-icons/pi";
import { FaAlignLeft, FaBullhorn } from "react-icons/fa";
import { MdInfoOutline } from "react-icons/md";


// content
import HeroImages from "./HeroImages";
import Texts from "./Texts";
import ImageUpdate from "./ImageUpdate";


import { updateText } from "@/actions/uiElements";


export default function UIConfig() {

    // console.log(products)
    const { components } = useComponents();
    const [currentIndex, setCurrentIndex] = useState(-1);


    const options = [
        { title: "Hero Images Update", icon: <IoMdImages />, content: <HeroImages heroImages={components?.find(component => component.id === "hero_imgs").value} setCurrentIndex={setCurrentIndex}/>, description: "Change or update the main banner images on the homepage." },
        { title: "Hero MainText", icon: <LuHeading1 />,
            content:
            <Texts
            text={components?.find(component => component.id === "maintext").value}
            id={"maintext"}
            display={"Hero Main Text"}
            mini={30}
            maxi={60}
            updateText={updateText}
            setCurrentIndex={setCurrentIndex}
            />, 
            description: "Edit the primary headline text shown on the hero section." },
        { title: "Hero SubText", icon: <PiTextAaFill />, content:
            <Texts
            text={components?.find(component => component.id === "subtext").value}
            id={"subtext"}
            display={"Hero Sub Text"}
            mini={50}
            maxi={250}
            updateText={updateText}
            setCurrentIndex={setCurrentIndex}
            />,
            description: "Edit the supporting subtext beneath the hero headline." },
        { title: "SubHero Image", icon: <IoMdImage />, content:
        <ImageUpdate
        image={components?.find(component => component.id === "heroTwo_img").value}
        setCurrentIndex={setCurrentIndex}
        id={"heroTwo_img"}
        canNull={false}
        />,
        description: "Update the secondary section image displayed below the hero." },
        { title: "SubHero MainText", icon: <LuHeading2 />, content:
            <Texts
            text={components?.find(component => component.id === "heroTwo_maintext").value}
            id={"heroTwo_maintext"}
            display={"SubHero MainText"}
            mini={30}
            maxi={100}
            updateText={updateText}
            setCurrentIndex={setCurrentIndex}
            />,
            description: "Edit the main title for the sub-hero section content." },
        { title: "SubHero SubText", icon: <PiTextAaLight />, content:
            <Texts
            text={components?.find(component => component.id === "heroTwo_subtext").value}
            id={"heroTwo_subtext"}
            display={"SubHero SubText"}
            mini={50}
            maxi={200}
            updateText={updateText}
            setCurrentIndex={setCurrentIndex}
            />,
            description: "Edit the supporting text under the sub-hero title." },
        { title: "Advert Banner", icon: <FaBullhorn />, content:   
        <ImageUpdate
            image={components?.find(component => component.id === "banner").value}
            setCurrentIndex={setCurrentIndex}
            id={"banner"}
            canNull={true}
            />,
             description: "Manage or update promotional banner content on the site." },
        { title: "About Us Text", icon: <MdInfoOutline />, content:
            <Texts
            text={components?.find(component => component.id === "aboutus").value}
            id={"aboutus"}
            display={"About Us Text"}
            mini={150}
            maxi={500}
            updateText={updateText}
            setCurrentIndex={setCurrentIndex}
            />,
            description: "Update the business description or story on the About Us section." }
    ];



    return (
        <div className={styles.mainContainer}>


            {currentIndex < 0 ?




                (<div className={styles.uiConfigMain}>
                    {options.map((option, index) => (

                        <div
                            className={styles.optionCard}
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                        >
                            <h1>{option.icon}</h1>
                            <h3>{option.title}</h3>
                        </div>
                    ))}
                </div>

                ) : (
<div className={styles.viewContainer}>
                    {options[currentIndex].content}
                    </div>
                )

            }

        </div>

    );
}
