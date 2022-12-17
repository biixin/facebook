import React, {useState} from "react";
import therock from "../../assets/therock.jpg";
import therock2 from "../../assets/therock2.webp";
import therock20 from "../../assets/therock20.jpg";
import mike from "../../assets/1miketyson.jpg";
import mikeprofile from "../../assets/mikeprofile.webp";
import mrbeastbackground from "../../assets/mrbeastbackground.webp";
import mrbeast from "../../assets/1mrbeast.jpg";
import kobebackground from "../../assets/kobebackground.jpg";
import kobe from "../../assets/1kobe.webp";
import arnoldbackground from "../../assets/arnoldbackground.webp";
import arnold from "../../assets/1arnold.jpg";
import Image from "next/image";
import styles from './style.module.css'
import {BsChevronRight, BsChevronLeft} from 'react-icons/bs'


const Stories = () => {
    const [marginSlide, setMarginSlide] = useState(0)
    const [storiesSize, setStoriesSize] = useState(0)

  const stories = [
    { profile: mikeprofile, background: mike, uid: "1" },
    { profile: mrbeast, background: mrbeastbackground, uid: "2" },
    { profile: kobe, background: kobebackground, uid: "3" },
    { profile: arnold, background: arnoldbackground, uid: "4" },
  ];

  return (
    <div className={styles.container} style={{position: 'relative'}}>
        
        <div className={styles.storiesSlide} style={{marginLeft: marginSlide}}>
            <div className={styles.storie} >
                <div className="flex">
                    <Image 
                        src={arnold}
                        alt='arnold'
                        className="flex object-cover rounded-[1rem]"
                    />
                </div>
                <div className="flex absolute top-1 left-1 w-9 h-9 p-1 bg-blue-500 rounded-full">
                <Image
                    src={arnold}
                    alt='arnold'
                    className="rounded-full object-cover"
                />
                </div>
            </div>
            {stories.map((story) => (
                <div
                    key={story.uid}
                    className={styles.storie}
                >
                    <div className="flex">
                    <Image
                        src={story.background}
                        alt='t'
                        className="flex object-cover rounded-[1rem]"
                    />
                    <div className="flex absolute top-1 left-1 w-9 h-9 p-1 bg-blue-500 rounded-full">
                        <Image
                        src={story.profile}
                        alt='t'
                        className="rounded-full object-cover"
                        />
                    </div>
                    </div>
                </div>
            ))}
        </div>
        
        
        
        
    </div>
  );
};

export default Stories;
