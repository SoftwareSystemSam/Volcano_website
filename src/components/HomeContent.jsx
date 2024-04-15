import volcanoImage from '../volcano.jpg';


export default function HomeContent() {
  return (
    <div className="HomeContent">
      <h1> Volcanoes of the World</h1>
      <p>Hello! Website is still in development</p>
      <div style={{
        backgroundImage: `url(${volcanoImage})`,
        height: '300px',
        width: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        
      </div>
    </div>
  );
}