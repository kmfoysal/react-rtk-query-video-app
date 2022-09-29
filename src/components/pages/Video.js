import { useGetSingleVideoQuery } from "../../features/api/apiSlice";
import Description from "../video/Description";
import Player from "../video/Player";
import RelatedVideos from "../video/related/RelatedVideos";
import PlayerLoader from '../../components/ui/loaders/PlayerLoader'
import DiscriptionLoader from "../../components/ui/loaders/DescriptionLoader";

import Error from "../ui/Error";
import { useParams } from "react-router-dom";

export default function Video() {

    const { videoId } = useParams();

    const { data: video, isError, isLoading } = useGetSingleVideoQuery(videoId);

    let content = null;

    if(isLoading){
        content = (
          <>
            <PlayerLoader />
            <DiscriptionLoader />
          </>
        );
    }

    if(!isLoading && isError) {
        content = <Error />
    }

    if (!isLoading && !isError && video?.id) {
      content = (
        <>
          <Player link={video.link} title={video.title}/>
          <Description video={video}/>
        </>
      );
    }

    return (
        <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
            <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
                <div className="grid grid-cols-3 gap-2 lg:gap-8">
                    <div className="col-span-full w-full space-y-8 lg:col-span-2">
                        {content}
                    </div>

                    <RelatedVideos />
                </div>
            </div>
        </section>
    );
}
