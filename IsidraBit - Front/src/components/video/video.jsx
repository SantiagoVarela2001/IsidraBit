import ReactPlayer from 'react-player/youtube'

const video = ({url}) => {
  return (
    <div className="">

  <div className="embed-responsive embed-responsive-16by9">
  <ReactPlayer url={url} controls={true} width={320} height={180}/>
  </div>
</div>
  )
}

export default video