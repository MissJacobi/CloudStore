import background from '../assets/background.png'
const GalaxyBackground = () => {
    return(
        <div className="fixed inset-0 -z-10 bg-black overflow-hidden"
        style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundColor: '#020205'
        }}
        />
    );
};

export default GalaxyBackground;