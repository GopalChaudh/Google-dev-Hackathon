import axios from 'axios';
import React, { useEffect, useState } from 'react';

const NewsSlider = () => {
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [imageUrl,setimageUrl] = useState('');
//     author
// : 
// "Science X"
// content
// : 
// "by University of Arkansas System Division of Agriculture\r\nNaturally occurring polyphenols and proteins from pigmented waxy rice may help starch ingredients improve texture without any chemical modifi… [+6354 chars]"
// description
// : 
// "Naturally occurring polyphenols and proteins from pigmented waxy rice may help starch ingredients improve texture without any chemical modification—a change some consumers may welcome, said Ya-Jane Wang, professor of carbohydrate chemistry."
// publishedAt
// : 
// "2024-03-29T16:20:57Z"
// source
// : 
// {id: null, name: 'Phys.Org'}
// title
// : 
// "Researchers look to rice for 'clean label' ingredients"
// url
// : 
// "https://phys.org/news/2024-03-rice-ingredients.html"
// urlToImage
// : 
// "https://scx2.b-cdn.net/gfx/news/hires/2024/researchers-look-to-ri.jpg"
    const fetchData = async () => {
        const options = {
            method: 'GET',
            url: 'https://newsapi.org/v2/everything?q=related+agriculture&sortBy=publishedAt&apiKey=5b7dca0a88e743feb6137568d6b14dd3',
        };

        try {
            const response = await axios.request(options);
           
            console.log(response.data.articles);
            const data = response.data.articles[0]
            setTitle(data.title);
            setDescription(data.description);
            setimageUrl(data.urlToImage)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        
        fetchData();
    }, []); // Em
    return (
        
        // 

<div className="w-full h-full bg-white border border-gray-200  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img className="rounded-t-lg h-1/3"  src={imageUrl} alt=""  />
    </a>
    <div className="p-5">
        <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
             <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    </div>
</div>


    );
}

export default NewsSlider;
