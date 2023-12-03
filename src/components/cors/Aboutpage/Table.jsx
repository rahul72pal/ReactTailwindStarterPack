import React from 'react'
import CTAbutton from '../homePage/CTAbutton'

const Table = () => {

    const tabledata = [
        {
            order: -1,
            heading: "World-Class Learning For",
            highliteText: "Anyone, Anywhere",
            description: "This is the best platform for building web and mobile applications. Our comprehensive courses cover a wide range of technologies, from frontend development with React and Vue to backend with Node.js and Python. With our hands-on projects and experienced instructors, you'll gain the skills you need to succeed in today's competitive tech industry.",
            BtnText: "Learn More",
            BtnLink: "/"
        },
        {
            order: 0,
            heading: "Unlock Your Potential",
            highliteText: "with Our Courses",
            description: "Our courses are designed to unlock your full potential in the tech industry. Whether you're just starting or looking to advance your career, we have a course for you. Explore our diverse catalog, and embark on a journey to become a top-notch developer or engineer.",
            BtnText: "Browse Courses",
            BtnLink: "/"
        },
        {
            order: 1,
            heading: "Join Our Community",
            highliteText: "of Learners",
            description: "At our platform, you won't just learn alone. Join a community of passionate learners from all around the world. Share your experiences, ask questions, and collaborate on projects. Together, we can achieve more.",
            BtnText: "Join Community",
            BtnLink: "/"
        },
        {
            order: 2,
            heading: "Real-World Projects",
            highliteText: "for Real-World Skills",
            description: "Our courses emphasize hands-on learning. You'll work on real-world projects that simulate industry scenarios. Gain practical experience and develop skills that are directly applicable to your job or future projects.",
            BtnText: "Explore Projects",
            BtnLink: "/"
        },
        {
            order: 3,
            heading: "Stay Up-to-Date",
            highliteText: "with Technology",
            description: "The tech industry is constantly evolving. Our platform is committed to keeping you updated with the latest trends and technologies. From updates on popular libraries to new languages and frameworks, we've got you covered.",
            BtnText: "Read Blog",
            BtnLink: "/"
        },
        {
            order: 4,
            heading: "Responsive Support",
            highliteText: "Team",
            description: "Have a question or need assistance? Our dedicated support team is here to help. Contact us through various channels, and we'll provide quick and responsive assistance to ensure your learning journey is smooth.",
            BtnText: "Get Support",
            BtnLink: "/"
        },
        // {
        //     order: 5,
        //     heading: "Start Learning Today",
        //     highliteText: "and Transform Your Future",
        //     description: "Don't wait to unlock your potential. Start learning today with our world-class courses and resources. Transform your future and open doors to countless opportunities in the tech industry.",
        //     BtnText: "Get Started",
        //     BtnLink: "/"
        // }
    ];




    return (
        <div className='grid mx-auto lg:grid-cols-4 grid-cols-1 gap-5 m-5'>
            {tabledata.map((card, index) => (
                <div
                    key={index}
                    className={`
        ${index === 0 && "lg:col-span-2"}
        ${card.order % 2 === 1 ? "bg-richblack-600" : "bg-richblack-800"}
        ${card.order === 2 && "lg:col-start-2"}
        p-4 rounded-md
      `}
                >
                    <div>
                        {/* heading  */}
                        <div className="text-white font-bold text-xl mb-2">{card.heading}</div>
                        {/* para  */}
                        <div className="text-gray-300">{card.description}</div>
                        {/* button  */}
                        {card.order < 0 && (
                            <div className="mt-4">
                                <CTAbutton children={card.BtnText} active={true} linkto={card.BtnLink} />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>

    )
}

export default Table
