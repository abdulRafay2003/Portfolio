"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import StackIcon from "tech-stack-icons";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const stats = [
    { number: "+4", label: "YEARS OF\nEXPERIENCE" },
    { number: "+20", label: "PROJECTS\nCOMPLETED" },
    { number: "+15", label: "WORLDWIDE\nCLIENTS" },
  ];

  const projects = [
    {
      id: "1",
      title: "Chefnero",
      image: require("../lib/projectAssets/Chefnero/display.png"),
      category: "Mobile App Development",
      client: "Restaurant Chain",
      date: "2021",
      technologies: ["Node.js", "React Native", "MongoDB"],
      shortDescription:
        "Chefnero the ultimate food discovery app, allows you to discover and savor local chef creation.",
      description:
        "Too busy to cook or miss freshly cooked meals? You can find food prepared the way you want by local certified chefs with our app. Browse menu of chefs around you or have a chat with chefs to request custom order You can view Chefs availability to help you plan your order Place order with peace of mind as payment is released only after order is delivered. Not available in your city? We’re working on it.",
      challenge:
        "One of the main challenges we faced was creating a seamless user experience that simplifies the process of discovering and ordering food. We worked hard to ensure that the app's interface is user friendly, allowing them to easily navigate through different menus and explore dishes from various chefs. Additionally, we focused on implementing reliable and secure features such as instant chat with chefs to provide users with essential information about the food and maintain a trustworthy environment.",
      goal: "The goal of Chefnero is to simplify the process of discovering and ordering food from local chefs. By providing a user-friendly platform, we aim to connect food enthusiasts with talented chefs in their neighborhood and enable them to conveniently access and enjoy a wide variety of delicious meals. Our objective is to bring together consumers and local culinary talent, creating a lively community that celebrates diverse flavors and food experiences.",
      audience:
        "Chefnero caters to food lovers of all ages who seek convenience and variety in their dining experiences. Whether you're a busy professional, a student, or simply someone who appreciates good food, Chefnero is designed to meet your craving needs. The app is made for everyone, no matter your age or what kind of food you love. It's all about making dining easy and enjoyable for everyone who wants quality and convenience.",
      videoUrl: "/videos/chefnero.mp4",
      images: [
        require("../lib/projectAssets/Chefnero/display-2.webp"),
        require("../lib/projectAssets/Chefnero/display.png"),
      ],
    },
    {
      id: "2",
      title: "Pidj",
      image: require("../lib/projectAssets/Pidj/display.png"),
      category: "Web Development & Mobile App Development",
      client: "Communication Company",
      date: "2023",
      technologies: ["React.js", "React Native", "Php", "SQL", "Tailwind CSS"],
      shortDescription:
        "Boost Your Business and Community Communication with Pidj Mobile.",
      description:
        "Efficiently manage your business and community communications with the Pid text messaging app. With 2-way communication and Textcast capabilities, you can easily stay connected with your team, customers, or community in real-time. Never miss a message and streamline your workflow with our user-friendly interface. Download now and take your business to the next level",
      challenge:
        "Our main challenge lies in differentiating Pidj Mobile in a saturated mobile communication market, where lots of other communication apps are already available. We need to show off Pidj Mobile's special features, especially its Textcast thing, so people will want to use it. Another big challenge is keeping everything safe and private. We know it's really important to make sure people trust us with their info, especially if they're running businesses and dealing with sensitive stuff. Additionally, encouraging user adoption of Pidj Mobile might need some explanation and showing them how much it can help them save time and work better.",
      goal: "Our primary objective in developing Pidj is to enhance communication efficiency for businesses and communities. We aim to empower them by providing a user-friendly platform that simplifies communication and improves workflow. With Pidj, users can enjoy the benefits of two-way texting and Textcast capabilities, enabling them to connect efficiently with their teams, customers, or community members in real-time.Pidj Mobile aims to bring all your communication in one place and ensure that no messages are missed. By doing so, it encourages collaboration and increases productivity, which is essential for businesses to achieve their goals. It also helps strengthen relationships, enhance customer satisfaction, and promote active engagement within communities. Its user-friendly features make communication easier and more efficient, allowing businesses to thrive and succeed",
      audience:
        "Pidj caters to a broad audience in search of efficient communication solutions. t's great for nonprofit groups, schools, and community organizations who need to send out lots of messages, organize events, or keep members engaged. And it's not just for them businesses of any size, from small startups to big companies, can use Pidj too. It helps teams stay in touch, share news, and work together easily. Even customer service teams can use Pidj to talk to customers and fix problems fast.",
      videoUrl: "/videos/pidj.mp4",
      images: [
        require("../lib/projectAssets/Pidj/display.png"),
        require("../lib/projectAssets/Pidj/mockup.png"),
      ],
    },
    {
      id: "3",
      title: "Event Buddy",
      image: require("../lib/projectAssets/EventBuddy/display.png"),
      category: "Web Development & Mobile App Development",
      client: "Communication Company",
      date: "2023",
      technologies: ["React.js", "React Native", "Php", "SQL", "Tailwind CSS"],
      shortDescription:
        "Boost Your Business and Community Communication with Pidj Mobile.",
      description:
        "Efficiently manage your business and community communications with the Pid text messaging app. With 2-way communication and Textcast capabilities, you can easily stay connected with your team, customers, or community in real-time. Never miss a message and streamline your workflow with our user-friendly interface. Download now and take your business to the next level",
      challenge:
        "Our main challenge lies in differentiating Pidj Mobile in a saturated mobile communication market, where lots of other communication apps are already available. We need to show off Pidj Mobile's special features, especially its Textcast thing, so people will want to use it. Another big challenge is keeping everything safe and private. We know it's really important to make sure people trust us with their info, especially if they're running businesses and dealing with sensitive stuff. Additionally, encouraging user adoption of Pidj Mobile might need some explanation and showing them how much it can help them save time and work better.",
      goal: "Our primary objective in developing Pidj is to enhance communication efficiency for businesses and communities. We aim to empower them by providing a user-friendly platform that simplifies communication and improves workflow. With Pidj, users can enjoy the benefits of two-way texting and Textcast capabilities, enabling them to connect efficiently with their teams, customers, or community members in real-time.Pidj Mobile aims to bring all your communication in one place and ensure that no messages are missed. By doing so, it encourages collaboration and increases productivity, which is essential for businesses to achieve their goals. It also helps strengthen relationships, enhance customer satisfaction, and promote active engagement within communities. Its user-friendly features make communication easier and more efficient, allowing businesses to thrive and succeed",
      audience:
        "Pidj caters to a broad audience in search of efficient communication solutions. t's great for nonprofit groups, schools, and community organizations who need to send out lots of messages, organize events, or keep members engaged. And it's not just for them businesses of any size, from small startups to big companies, can use Pidj too. It helps teams stay in touch, share news, and work together easily. Even customer service teams can use Pidj to talk to customers and fix problems fast.",
      videoUrl: "/videos/pidj.mp4",
      images: [
        require("../lib/projectAssets/Pidj/display.png"),
        require("../lib/projectAssets/Pidj/mockup.png"),
      ],
    },
    {
      id: "4",

      title: "Phonesheet",
      image: require("../lib/projectAssets/Phonesheet/mockup.png"),
      category: "Web Development & Mobile App Development",
      client: "Communication Company",
      date: "2023",
      technologies: ["React.js", "React Native", "Php", "SQL", "Tailwind CSS"],
      shortDescription:
        "Boost Your Business and Community Communication with Pidj Mobile.",
      description:
        "Efficiently manage your business and community communications with the Pid text messaging app. With 2-way communication and Textcast capabilities, you can easily stay connected with your team, customers, or community in real-time. Never miss a message and streamline your workflow with our user-friendly interface. Download now and take your business to the next level",
      challenge:
        "Our main challenge lies in differentiating Pidj Mobile in a saturated mobile communication market, where lots of other communication apps are already available. We need to show off Pidj Mobile's special features, especially its Textcast thing, so people will want to use it. Another big challenge is keeping everything safe and private. We know it's really important to make sure people trust us with their info, especially if they're running businesses and dealing with sensitive stuff. Additionally, encouraging user adoption of Pidj Mobile might need some explanation and showing them how much it can help them save time and work better.",
      goal: "Our primary objective in developing Pidj is to enhance communication efficiency for businesses and communities. We aim to empower them by providing a user-friendly platform that simplifies communication and improves workflow. With Pidj, users can enjoy the benefits of two-way texting and Textcast capabilities, enabling them to connect efficiently with their teams, customers, or community members in real-time.Pidj Mobile aims to bring all your communication in one place and ensure that no messages are missed. By doing so, it encourages collaboration and increases productivity, which is essential for businesses to achieve their goals. It also helps strengthen relationships, enhance customer satisfaction, and promote active engagement within communities. Its user-friendly features make communication easier and more efficient, allowing businesses to thrive and succeed",
      audience:
        "Pidj caters to a broad audience in search of efficient communication solutions. t's great for nonprofit groups, schools, and community organizations who need to send out lots of messages, organize events, or keep members engaged. And it's not just for them businesses of any size, from small startups to big companies, can use Pidj too. It helps teams stay in touch, share news, and work together easily. Even customer service teams can use Pidj to talk to customers and fix problems fast.",
      videoUrl: "/videos/pidj.mp4",
      images: [
        require("../lib/projectAssets/Pidj/display.png"),
        require("../lib/projectAssets/Pidj/mockup.png"),
      ],
    },
    {
      id: "5",
      title: "ShowOff",
      image: require("../lib/projectAssets/ShowOff/display.png"),
      category: "Web Development & Mobile App Development",
      client: "Communication Company",
      date: "2023",
      technologies: ["React.js", "React Native", "Php", "SQL", "Tailwind CSS"],
      shortDescription:
        "Boost Your Business and Community Communication with Pidj Mobile.",
      description:
        "Efficiently manage your business and community communications with the Pid text messaging app. With 2-way communication and Textcast capabilities, you can easily stay connected with your team, customers, or community in real-time. Never miss a message and streamline your workflow with our user-friendly interface. Download now and take your business to the next level",
      challenge:
        "Our main challenge lies in differentiating Pidj Mobile in a saturated mobile communication market, where lots of other communication apps are already available. We need to show off Pidj Mobile's special features, especially its Textcast thing, so people will want to use it. Another big challenge is keeping everything safe and private. We know it's really important to make sure people trust us with their info, especially if they're running businesses and dealing with sensitive stuff. Additionally, encouraging user adoption of Pidj Mobile might need some explanation and showing them how much it can help them save time and work better.",
      goal: "Our primary objective in developing Pidj is to enhance communication efficiency for businesses and communities. We aim to empower them by providing a user-friendly platform that simplifies communication and improves workflow. With Pidj, users can enjoy the benefits of two-way texting and Textcast capabilities, enabling them to connect efficiently with their teams, customers, or community members in real-time.Pidj Mobile aims to bring all your communication in one place and ensure that no messages are missed. By doing so, it encourages collaboration and increases productivity, which is essential for businesses to achieve their goals. It also helps strengthen relationships, enhance customer satisfaction, and promote active engagement within communities. Its user-friendly features make communication easier and more efficient, allowing businesses to thrive and succeed",
      audience:
        "Pidj caters to a broad audience in search of efficient communication solutions. t's great for nonprofit groups, schools, and community organizations who need to send out lots of messages, organize events, or keep members engaged. And it's not just for them businesses of any size, from small startups to big companies, can use Pidj too. It helps teams stay in touch, share news, and work together easily. Even customer service teams can use Pidj to talk to customers and fix problems fast.",
      videoUrl: "/videos/pidj.mp4",
      images: [
        require("../lib/projectAssets/Pidj/display.png"),
        require("../lib/projectAssets/Pidj/mockup.png"),
      ],
    },
    {
      id: "6",
      title: "Group Homes",
      image: require("../lib/projectAssets/GroupHomes/display.png"),
      category: "Web Development & Mobile App Development",
      client: "Communication Company",
      date: "2023",
      technologies: ["React.js", "React Native", "Php", "SQL", "Tailwind CSS"],
      shortDescription:
        "Boost Your Business and Community Communication with Pidj Mobile.",
      description:
        "Efficiently manage your business and community communications with the Pid text messaging app. With 2-way communication and Textcast capabilities, you can easily stay connected with your team, customers, or community in real-time. Never miss a message and streamline your workflow with our user-friendly interface. Download now and take your business to the next level",
      challenge:
        "Our main challenge lies in differentiating Pidj Mobile in a saturated mobile communication market, where lots of other communication apps are already available. We need to show off Pidj Mobile's special features, especially its Textcast thing, so people will want to use it. Another big challenge is keeping everything safe and private. We know it's really important to make sure people trust us with their info, especially if they're running businesses and dealing with sensitive stuff. Additionally, encouraging user adoption of Pidj Mobile might need some explanation and showing them how much it can help them save time and work better.",
      goal: "Our primary objective in developing Pidj is to enhance communication efficiency for businesses and communities. We aim to empower them by providing a user-friendly platform that simplifies communication and improves workflow. With Pidj, users can enjoy the benefits of two-way texting and Textcast capabilities, enabling them to connect efficiently with their teams, customers, or community members in real-time.Pidj Mobile aims to bring all your communication in one place and ensure that no messages are missed. By doing so, it encourages collaboration and increases productivity, which is essential for businesses to achieve their goals. It also helps strengthen relationships, enhance customer satisfaction, and promote active engagement within communities. Its user-friendly features make communication easier and more efficient, allowing businesses to thrive and succeed",
      audience:
        "Pidj caters to a broad audience in search of efficient communication solutions. t's great for nonprofit groups, schools, and community organizations who need to send out lots of messages, organize events, or keep members engaged. And it's not just for them businesses of any size, from small startups to big companies, can use Pidj too. It helps teams stay in touch, share news, and work together easily. Even customer service teams can use Pidj to talk to customers and fix problems fast.",
      videoUrl: "/videos/pidj.mp4",
      images: [
        require("../lib/projectAssets/Pidj/display.png"),
        require("../lib/projectAssets/Pidj/mockup.png"),
      ],
    },

    {
      id: "7",
      title: "Chefnero",
      image: require("../lib/projectAssets/Chefnero/display.png"),
      category: "Mobile App Development",
      client: "Restaurant Chain",
      date: "2021",
      technologies: ["Node.js", "React Native", "MongoDB"],
      shortDescription:
        "Chefnero the ultimate food discovery app, allows you to discover and savor local chef creation.",
      description:
        "Too busy to cook or miss freshly cooked meals? You can find food prepared the way you want by local certified chefs with our app. Browse menu of chefs around you or have a chat with chefs to request custom order You can view Chefs availability to help you plan your order Place order with peace of mind as payment is released only after order is delivered. Not available in your city? We’re working on it.",
      challenge:
        "One of the main challenges we faced was creating a seamless user experience that simplifies the process of discovering and ordering food. We worked hard to ensure that the app's interface is user friendly, allowing them to easily navigate through different menus and explore dishes from various chefs. Additionally, we focused on implementing reliable and secure features such as instant chat with chefs to provide users with essential information about the food and maintain a trustworthy environment.",
      goal: "The goal of Chefnero is to simplify the process of discovering and ordering food from local chefs. By providing a user-friendly platform, we aim to connect food enthusiasts with talented chefs in their neighborhood and enable them to conveniently access and enjoy a wide variety of delicious meals. Our objective is to bring together consumers and local culinary talent, creating a lively community that celebrates diverse flavors and food experiences.",
      audience:
        "Chefnero caters to food lovers of all ages who seek convenience and variety in their dining experiences. Whether you're a busy professional, a student, or simply someone who appreciates good food, Chefnero is designed to meet your craving needs. The app is made for everyone, no matter your age or what kind of food you love. It's all about making dining easy and enjoyable for everyone who wants quality and convenience.",
      videoUrl: "/videos/chefnero.mp4",
      images: [
        require("../lib/projectAssets/Chefnero/display-2.webp"),
        require("../lib/projectAssets/Chefnero/display.png"),
      ],
    },
    {
      id: "8",
      title: "Pidj",
      image: require("../lib/projectAssets/Pidj/display.png"),
      category: "Web Development & Mobile App Development",
      client: "Communication Company",
      date: "2023",
      technologies: ["React.js", "React Native", "Php", "SQL", "Tailwind CSS"],
      shortDescription:
        "Boost Your Business and Community Communication with Pidj Mobile.",
      description:
        "Efficiently manage your business and community communications with the Pid text messaging app. With 2-way communication and Textcast capabilities, you can easily stay connected with your team, customers, or community in real-time. Never miss a message and streamline your workflow with our user-friendly interface. Download now and take your business to the next level",
      challenge:
        "Our main challenge lies in differentiating Pidj Mobile in a saturated mobile communication market, where lots of other communication apps are already available. We need to show off Pidj Mobile's special features, especially its Textcast thing, so people will want to use it. Another big challenge is keeping everything safe and private. We know it's really important to make sure people trust us with their info, especially if they're running businesses and dealing with sensitive stuff. Additionally, encouraging user adoption of Pidj Mobile might need some explanation and showing them how much it can help them save time and work better.",
      goal: "Our primary objective in developing Pidj is to enhance communication efficiency for businesses and communities. We aim to empower them by providing a user-friendly platform that simplifies communication and improves workflow. With Pidj, users can enjoy the benefits of two-way texting and Textcast capabilities, enabling them to connect efficiently with their teams, customers, or community members in real-time.Pidj Mobile aims to bring all your communication in one place and ensure that no messages are missed. By doing so, it encourages collaboration and increases productivity, which is essential for businesses to achieve their goals. It also helps strengthen relationships, enhance customer satisfaction, and promote active engagement within communities. Its user-friendly features make communication easier and more efficient, allowing businesses to thrive and succeed",
      audience:
        "Pidj caters to a broad audience in search of efficient communication solutions. t's great for nonprofit groups, schools, and community organizations who need to send out lots of messages, organize events, or keep members engaged. And it's not just for them businesses of any size, from small startups to big companies, can use Pidj too. It helps teams stay in touch, share news, and work together easily. Even customer service teams can use Pidj to talk to customers and fix problems fast.",
      videoUrl: "/videos/pidj.mp4",
      images: [
        require("../lib/projectAssets/Pidj/display.png"),
        require("../lib/projectAssets/Pidj/mockup.png"),
      ],
    },
    {
      id: "9",
      title: "Event Buddy",
      image: require("../lib/projectAssets/EventBuddy/display.png"),
      category: "Web Development & Mobile App Development",
      client: "Communication Company",
      date: "2023",
      technologies: ["React.js", "React Native", "Php", "SQL", "Tailwind CSS"],
      shortDescription:
        "Boost Your Business and Community Communication with Pidj Mobile.",
      description:
        "Efficiently manage your business and community communications with the Pid text messaging app. With 2-way communication and Textcast capabilities, you can easily stay connected with your team, customers, or community in real-time. Never miss a message and streamline your workflow with our user-friendly interface. Download now and take your business to the next level",
      challenge:
        "Our main challenge lies in differentiating Pidj Mobile in a saturated mobile communication market, where lots of other communication apps are already available. We need to show off Pidj Mobile's special features, especially its Textcast thing, so people will want to use it. Another big challenge is keeping everything safe and private. We know it's really important to make sure people trust us with their info, especially if they're running businesses and dealing with sensitive stuff. Additionally, encouraging user adoption of Pidj Mobile might need some explanation and showing them how much it can help them save time and work better.",
      goal: "Our primary objective in developing Pidj is to enhance communication efficiency for businesses and communities. We aim to empower them by providing a user-friendly platform that simplifies communication and improves workflow. With Pidj, users can enjoy the benefits of two-way texting and Textcast capabilities, enabling them to connect efficiently with their teams, customers, or community members in real-time.Pidj Mobile aims to bring all your communication in one place and ensure that no messages are missed. By doing so, it encourages collaboration and increases productivity, which is essential for businesses to achieve their goals. It also helps strengthen relationships, enhance customer satisfaction, and promote active engagement within communities. Its user-friendly features make communication easier and more efficient, allowing businesses to thrive and succeed",
      audience:
        "Pidj caters to a broad audience in search of efficient communication solutions. t's great for nonprofit groups, schools, and community organizations who need to send out lots of messages, organize events, or keep members engaged. And it's not just for them businesses of any size, from small startups to big companies, can use Pidj too. It helps teams stay in touch, share news, and work together easily. Even customer service teams can use Pidj to talk to customers and fix problems fast.",
      videoUrl: "/videos/pidj.mp4",
      images: [
        require("../lib/projectAssets/Pidj/display.png"),
        require("../lib/projectAssets/Pidj/mockup.png"),
      ],
    },
    {
      id: "10",

      title: "Phonesheet",
      image: require("../lib/projectAssets/Phonesheet/mockup.png"),
      category: "Web Development & Mobile App Development",
      client: "Communication Company",
      date: "2023",
      technologies: ["React.js", "React Native", "Php", "SQL", "Tailwind CSS"],
      shortDescription:
        "Boost Your Business and Community Communication with Pidj Mobile.",
      description:
        "Efficiently manage your business and community communications with the Pid text messaging app. With 2-way communication and Textcast capabilities, you can easily stay connected with your team, customers, or community in real-time. Never miss a message and streamline your workflow with our user-friendly interface. Download now and take your business to the next level",
      challenge:
        "Our main challenge lies in differentiating Pidj Mobile in a saturated mobile communication market, where lots of other communication apps are already available. We need to show off Pidj Mobile's special features, especially its Textcast thing, so people will want to use it. Another big challenge is keeping everything safe and private. We know it's really important to make sure people trust us with their info, especially if they're running businesses and dealing with sensitive stuff. Additionally, encouraging user adoption of Pidj Mobile might need some explanation and showing them how much it can help them save time and work better.",
      goal: "Our primary objective in developing Pidj is to enhance communication efficiency for businesses and communities. We aim to empower them by providing a user-friendly platform that simplifies communication and improves workflow. With Pidj, users can enjoy the benefits of two-way texting and Textcast capabilities, enabling them to connect efficiently with their teams, customers, or community members in real-time.Pidj Mobile aims to bring all your communication in one place and ensure that no messages are missed. By doing so, it encourages collaboration and increases productivity, which is essential for businesses to achieve their goals. It also helps strengthen relationships, enhance customer satisfaction, and promote active engagement within communities. Its user-friendly features make communication easier and more efficient, allowing businesses to thrive and succeed",
      audience:
        "Pidj caters to a broad audience in search of efficient communication solutions. t's great for nonprofit groups, schools, and community organizations who need to send out lots of messages, organize events, or keep members engaged. And it's not just for them businesses of any size, from small startups to big companies, can use Pidj too. It helps teams stay in touch, share news, and work together easily. Even customer service teams can use Pidj to talk to customers and fix problems fast.",
      videoUrl: "/videos/pidj.mp4",
      images: [
        require("../lib/projectAssets/Pidj/display.png"),
        require("../lib/projectAssets/Pidj/mockup.png"),
      ],
    },
    {
      id: "11",
      title: "ShowOff",
      image: require("../lib/projectAssets/ShowOff/display.png"),
      category: "Web Development & Mobile App Development",
      client: "Communication Company",
      date: "2023",
      technologies: ["React.js", "React Native", "Php", "SQL", "Tailwind CSS"],
      shortDescription:
        "Boost Your Business and Community Communication with Pidj Mobile.",
      description:
        "Efficiently manage your business and community communications with the Pid text messaging app. With 2-way communication and Textcast capabilities, you can easily stay connected with your team, customers, or community in real-time. Never miss a message and streamline your workflow with our user-friendly interface. Download now and take your business to the next level",
      challenge:
        "Our main challenge lies in differentiating Pidj Mobile in a saturated mobile communication market, where lots of other communication apps are already available. We need to show off Pidj Mobile's special features, especially its Textcast thing, so people will want to use it. Another big challenge is keeping everything safe and private. We know it's really important to make sure people trust us with their info, especially if they're running businesses and dealing with sensitive stuff. Additionally, encouraging user adoption of Pidj Mobile might need some explanation and showing them how much it can help them save time and work better.",
      goal: "Our primary objective in developing Pidj is to enhance communication efficiency for businesses and communities. We aim to empower them by providing a user-friendly platform that simplifies communication and improves workflow. With Pidj, users can enjoy the benefits of two-way texting and Textcast capabilities, enabling them to connect efficiently with their teams, customers, or community members in real-time.Pidj Mobile aims to bring all your communication in one place and ensure that no messages are missed. By doing so, it encourages collaboration and increases productivity, which is essential for businesses to achieve their goals. It also helps strengthen relationships, enhance customer satisfaction, and promote active engagement within communities. Its user-friendly features make communication easier and more efficient, allowing businesses to thrive and succeed",
      audience:
        "Pidj caters to a broad audience in search of efficient communication solutions. t's great for nonprofit groups, schools, and community organizations who need to send out lots of messages, organize events, or keep members engaged. And it's not just for them businesses of any size, from small startups to big companies, can use Pidj too. It helps teams stay in touch, share news, and work together easily. Even customer service teams can use Pidj to talk to customers and fix problems fast.",
      videoUrl: "/videos/pidj.mp4",
      images: [
        require("../lib/projectAssets/Pidj/display.png"),
        require("../lib/projectAssets/Pidj/mockup.png"),
      ],
    },
    {
      id: "12",
      title: "Group Homes",
      image: require("../lib/projectAssets/GroupHomes/display.png"),
      category: "Web Development & Mobile App Development",
      client: "Communication Company",
      date: "2023",
      technologies: ["React.js", "React Native", "Php", "SQL", "Tailwind CSS"],
      shortDescription:
        "Boost Your Business and Community Communication with Pidj Mobile.",
      description:
        "Efficiently manage your business and community communications with the Pid text messaging app. With 2-way communication and Textcast capabilities, you can easily stay connected with your team, customers, or community in real-time. Never miss a message and streamline your workflow with our user-friendly interface. Download now and take your business to the next level",
      challenge:
        "Our main challenge lies in differentiating Pidj Mobile in a saturated mobile communication market, where lots of other communication apps are already available. We need to show off Pidj Mobile's special features, especially its Textcast thing, so people will want to use it. Another big challenge is keeping everything safe and private. We know it's really important to make sure people trust us with their info, especially if they're running businesses and dealing with sensitive stuff. Additionally, encouraging user adoption of Pidj Mobile might need some explanation and showing them how much it can help them save time and work better.",
      goal: "Our primary objective in developing Pidj is to enhance communication efficiency for businesses and communities. We aim to empower them by providing a user-friendly platform that simplifies communication and improves workflow. With Pidj, users can enjoy the benefits of two-way texting and Textcast capabilities, enabling them to connect efficiently with their teams, customers, or community members in real-time.Pidj Mobile aims to bring all your communication in one place and ensure that no messages are missed. By doing so, it encourages collaboration and increases productivity, which is essential for businesses to achieve their goals. It also helps strengthen relationships, enhance customer satisfaction, and promote active engagement within communities. Its user-friendly features make communication easier and more efficient, allowing businesses to thrive and succeed",
      audience:
        "Pidj caters to a broad audience in search of efficient communication solutions. t's great for nonprofit groups, schools, and community organizations who need to send out lots of messages, organize events, or keep members engaged. And it's not just for them businesses of any size, from small startups to big companies, can use Pidj too. It helps teams stay in touch, share news, and work together easily. Even customer service teams can use Pidj to talk to customers and fix problems fast.",
      videoUrl: "/videos/pidj.mp4",
      images: [
        require("../lib/projectAssets/Pidj/display.png"),
        require("../lib/projectAssets/Pidj/mockup.png"),
      ],
    },
  ];

  const experiences = [
    {
      company: "Wizard Innovations US",
      period: "Sept 2023 - Present",
      description:
        "Led the development team in creating user-centric mobile and web applications, improving the user experience and increasing user engagement.",
    },
    {
      company: "Ethos Engine AI",
      period: "June 2024 - Dec 2024",
      description:
        "Developed and implemented development strategies for new projects. Collaborated closely with development team and product managers.",
    },
    {
      company: "Tech Verticks",
      period: "May 2021 - Sept 2023",
      description:
        "Designed user interfaces for e-commerce and different service providing platforms, focusing on enhancing usability and visual appeal.",
    },
  ];

  const technologyStack = [
    {
      id: "1",
      name: "HTML",
      icon: "html5",
    },
    { id: "2", name: "CSS", icon: "css3" },
    { id: "3", name: "Javascript", icon: "js" },
    { id: "4", name: "Typescript", icon: "typescript" },
    { id: "5", name: "React", icon: "reactjs" },
    {
      id: "6",
      name: "React Native",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKZfF6a5sM19EW71iIlrzRBuuLJMCMxQ7vTQ&s",
    },
    {
      id: "7",
      name: "Xcode",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUoXub-hKgUAwqJGd1gItb6oABpSGU7JOhjg&s",
    },
    { id: "8", name: "Android Studio", icon: "android" },
    { id: "9", name: "Kotlin", icon: "kotlin" },
    { id: "10", name: "Swift", icon: "swift" },
    { id: "11", name: "Git", icon: "git" },
  ];

  const navOptions = [
    {
      title: "Projects",
      navigateTo: "/projects",
    },
    {
      title: "About",
      navigateTo: "/about",
    },
  ];

  const socialIcons = [
    {
      id: "1",
      title: "LinkedIn",
      icon: require("../lib/icons/linkedin.webp"),
      link: "https://linkedin.com/in/abdul-rafay-27b544233",
    },
    {
      id: "2",
      title: "Github",
      icon: require("../lib/icons/github.webp"),
      link: "https://github.com/abdulRafay2003",
    },
  ];

  return (
    <div className="min-h-screen bg-[#151312] text-white p-8 pt-16">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <nav className="flex justify-center mb-[70px] space-x-4">
          <div className="rounded-lg border-2 border-white flex p-1">
            {navOptions?.map((item: { title: string; navigateTo: string }) => {
              return (
                <Link
                  href={item?.navigateTo}
                  className="text-gray-400 text-[14px] hover:text-white transition-colors inline-flex items-center mx-1 my-1 px-3"
                >
                  {item?.title}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-24 mb-10 relative">
          {/* Profile Card - Now Sticky */}
          <div className="md:sticky md:top-8 md:h-fit">
            <Card className="rounded-3xl p-5 flex-1 w-[500px] md:max-w-xs bg-white items-center justify-center text-center">
              <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden">
                <Image
                  src={require("../lib/profile.png")}
                  alt="Profile"
                  layout="full"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
              <h2 className="text-3xl font-bold text-black mb-2">
                Abdul Rafay
              </h2>
              <p className="text-sm text-gray-600 mb-4 mt-5">
                A Software Engineer who has developed countless innovative
                solutions.
              </p>
              <h2 className="text-1xl font-bold mb-2 text-black">
                Personal Info
              </h2>
              <ul className="text-gray-600 text-sm space-y-2 mb-6">
                <li>Contact : +923363766006</li>
                <li>Email : abdurafay119@gmail.com</li>
              </ul>
              <div className="flex gap-3 items-center justify-center">
                {socialIcons?.map((social) =>
                  social?.id == "3" ? (
                    <a href="https://mailto:abdurafay119@gmail.com">
                      <Button
                        key={social.title}
                        size="icon"
                        className="rounded-full"
                      >
                        <Image
                          src={social?.icon}
                          alt={social.title}
                          layout="full"
                          objectFit="contain"
                          className="rounded-full"
                        />
                      </Button>
                    </a>
                  ) : (
                    <Link href={social?.link}>
                      <Button
                        key={social.title}
                        // variant="outline"
                        size="icon"
                        className="rounded-full"
                      >
                        <Image
                          src={social?.icon}
                          alt={social.title}
                          layout="full"
                          objectFit="contain"
                          className="rounded-full"
                        />
                      </Button>
                    </Link>
                  )
                )}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-[2] md:max-w-l">
            <h1 className="text-[120px] font-bold leading-none mb-4">
              SOFTWARE
              <br />
              <span className="text-zinc-800">ENGINEER</span>
            </h1>
            <p className="text-gray-400 mb-8 md:max-w-[480px]">
              Specializes in mobile application development, crafting
              high-performance, scalable, and user-friendly apps. With extensive
              experience in React Native and modern technologies, we bring ideas
              to life with seamless, innovative, and impactful mobile solutions
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8 md:max-w-[480px]">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="md:text-[70px] font-bold">{stat.number}</div>
                  <div className="text-[16px] text-gray-400 whitespace-pre-line">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Projects */}
            <section className="mb-20">
              <h2 className="text-[80px] font-bold leading-none mb-9 mt-24">
                RECENT
                <br />
                <span className="text-zinc-800">PROJECTS</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {projects?.slice(0, 6)?.map((project, index) => (
                  <Link
                    href={{
                      pathname: "/details",
                      query: {
                        data: encodeURIComponent(JSON.stringify(project)),
                      },
                    }}
                    className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
                  >
                    <Card
                      key={index}
                      className="bg-zinc-900 overflow-hidden group cursor-pointer w-full"
                    >
                      <div className="relative h-48">
                        <Image
                          src={project.image}
                          alt={project.title}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="text-[22px] font-semibold">
                          {project.title}
                        </h3>
                        {/* <p className="text-gray-400 text-[14px]">
                          {project.description}
                        </p> */}
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
              <Link href="/projects">
                <Button
                  onSubmit={() => {
                    alert("jbjnjn");
                    router.push("./projects");
                  }}
                  className="w-full bg-white  text-black mt-9"
                >
                  View All
                </Button>
              </Link>
            </section>

            {/* Experience */}
            <section className="mb-20">
              <h2 className="text-[80px] font-bold leading-none mb-9 mt-24">
                4 YEARS OF
                <br />
                <span className="text-zinc-800">EXPERIENCE</span>
              </h2>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <Card key={index} className="bg-zinc-900 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold">{exp.company}</h3>
                      <Badge variant="default">{exp.period}</Badge>
                    </div>
                    <p className="text-gray-400">{exp.description}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Premium Tools */}
            <section className="mb-20">
              <h2 className="text-[80px] font-bold leading-none mb-9 mt-24">
                TECHNOLOGY
                <br />
                <span className="text-zinc-800">STACK</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                {technologyStack.map((tool, index) => (
                  <Card
                    key={index}
                    className="bg-zinc-900 text-white p-3 flex items-center gap-4  hover:bg-white transition-all hover:text-black"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                      {tool?.id == "6" || tool?.id == "7" ? (
                        <Image
                          src={tool.icon}
                          alt={tool.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg"
                        />
                      ) : (
                        <StackIcon name={tool.icon} />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-3xl hover:text-black">
                        {tool.name}
                      </h3>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Design Thoughts */}
            {/* <section className="mb-20">
              <h2 className="text-[80px] font-bold leading-none mb-9 mt-24">
                DEVELOPMENT
                <br />
                <span className="text-zinc-800">INSIGHTS</span>
              </h2>
              <div className="space-y-6">
                {blogPosts.map((post, index) => (
                  <Card
                    key={index}
                    className="bg-zinc-900 p-6 group cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="text-gray-400 mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </section> */}

            {/* Let's Work Together */}
            <section className="mb-20">
              <h2 className="text-[80px] font-bold leading-none mb-9 mt-24">
                LET'S WORK
                <br />
                <span className="text-zinc-800">TOGETHER</span>
              </h2>
              {/* <Card className="bg-zinc-900 p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Name</label>
                      <Input
                        placeholder="Your Name"
                        className="bg-zinc-800 border-zinc-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Email</label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        className="bg-zinc-800 border-zinc-700"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Budget</label>
                    <Select>
                      <SelectTrigger className="bg-zinc-800 border-zinc-700">
                        <SelectValue placeholder="Select a budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Less than $5,000</SelectItem>
                        <SelectItem value="medium">$5,000 - $10,000</SelectItem>
                        <SelectItem value="large">$10,000 - $20,000</SelectItem>
                        <SelectItem value="enterprise">$20,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Message</label>
                    <Textarea
                      placeholder="Tell me about your project..."
                      className="bg-zinc-800 border-zinc-700 min-h-[150px]"
                    />
                  </div>
                  
                </form>
              </Card> */}
              <Button
                onClick={() =>
                  window.open("https://wa.me/923363766006", "_blank")
                }
                className="w-full h-12 bg-white text-lg  text-black"
              >
                Let's Connect
              </Button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
