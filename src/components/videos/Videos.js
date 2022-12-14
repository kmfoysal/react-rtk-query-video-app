import { useGetVideosQuery } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import VideoLoader from "../ui/loaders/VideoLoader";
import Video from "./Video";

export default function Videos() {

    const {data:videos, isLoading, isError} = useGetVideosQuery();

    let content = null;

    if(isLoading){

        content = 
            [1,2,3,4,5,6,7,8].map((i) => <VideoLoader key={i}/>)

    }

    if(!isLoading && isError){

      content = <Error />
        
    }

    if (!isLoading && !isError && videos.length === 0) {
      content = <>No Videos Found</>
    }

    if (!isLoading && !isError && videos.length > 0) {
      content = videos.map((video) => <Video key={video.id} video={video} />);
    }

    return (
        <>
            {content}
        </>
    );
}
