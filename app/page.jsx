import Feed from "@components/Feed"
const Home = () => {
  return (
   <section className="w-full flex-col flex-center">
   <h1 className="head_text text-center">
   Where Great Minds Meet
   <br className="max-mid:hideen" />
   <span className="orange_gradient text-center">Explore, Share, Innovate</span>
   </h1>
   <p className="desc text-center">
   A vibrant platform for sharing, discovering, and collaborating on innovative ideas across various fields to ignite creativity.
   </p>

   {/* Feed */}
   <Feed/>
   </section>
  )
}

export default Home