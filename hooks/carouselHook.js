import {
    useState,
    useEffect
} from "react";
import fetch from "isomorphic-unfetch";

export const useCarouselHook = () => {
    const [slides, setSlides] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:3000/api/contents/carousel`)
            .then((res) => {
                try {
                    return res.json();
                } catch (err) {
                    console.warn(e);
                }
            })
            .then((data) => {
                setSlides(data);
            })
            .catch((err) => {
                // console.log(err);
            });
    }, []);

    useEffect(() => {
        console.log("Component did update");
    }, [slides]);

    return slides;
}