import React from 'react'
import Footer from '../components/cors/Footer/Footer'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/opreations/pageAndComponentData';
import CourseSlider from '../components/cors/Catalog/CourseSlider';
import CourseCard from '../components/cors/Catalog/CourseCard';

const CatalogPage = () => {

    const { catalogName } = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

    const getCatgories = async () => {
        // const result = await apiConnector("GET", categories.CATEGORIES_API);
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            // console.log("GET RESULT OF THE CATGORY = ", result?.data?.data,catalogName.toLowerCase());
            const category_id =
                result?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName.toLowerCase())[0]._id;
            // console.log("RESULT OF THE CATEGORY ID = ", category_id);
            setCategoryId(category_id);
        } catch (error) {
            console.log("Clould not fetch the category link", error);
        }
    }

    //fetch all caregories
    useEffect(() => {
        // console.log("get catroy called")
        getCatgories();
    }, [catalogName]);

    useEffect(() => {
        const getCategoryDetails = async () => {
            try {
                // console.log("categoryId=", categoryId);
                const result = await getCatalogPageData(categoryId);
                console.log("Printing res of category details = ", result?.data);
                setCatalogPageData(result?.data);
            } catch (error) {
                console.log(error);
            }
        }
        if (categoryId) {
            getCategoryDetails();
        }

    }, [categoryId]);

    if (catalogPageData === undefined) {
        return (
            <div className='text-white text-3xl font-semibold'>
                No DATA FOUND
            </div>
        )
    }

    return (
        <div className='text-white m-6'>

            <div className='mb-4'>
                <p className='text-sm'>{`Home / Catalog /`} <span className='text-yellow-50'>{catalogName.toUpperCase()}</span></p>
                <p className='text-2xl text-yellow-50 mb-2'>{catalogName}</p>
                <p className='text-sm text-richblack-50'>{catalogPageData?.selectedCategory?.description}</p>
            </div>

            <div className='mb-8'>
                {/* Section 1 */}
                <div className='mb-8'>
                    <div className='text-xl font-bold mb-4'>Courses to Get You Started</div>
                    <div className='flex space-x-4 mb-4'>
                        <p className='cursor-pointer hover:text-yellow-50'>Most Popular</p>
                        <p className='cursor-pointer hover:text-yellow-50'>New</p>
                    </div>
                    <div>
                        <CourseSlider Courses={catalogPageData?.selectedCategory?.course} />
                    </div>
                </div>

                {/* Section 2 */}
                <div className='mb-8'>
                    <p className='text-xl font-bold mb-4'>Top Courses in {catalogName}</p>
                    <div>
                        {/* <CourseSlider Courses={catalogPageData?.differentCategory?.course} /> */}
                    </div>
                </div>

                {/* Section 3 */}
                <div>
                    <div className='text-xl font-bold mb-4'>Frequently Bought</div>
                    <div className='py-8'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                            {catalogPageData?.mostSellingCourses?.courses?.slice(0, 4)
                                .map((course, index) => (
                                    <CourseCard course={course} key={index} Height={"h-[400px]"} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>

    )
}

export default CatalogPage
