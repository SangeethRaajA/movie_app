var React = require('react');
var ReactDOM = require('react-dom');
var Carousel = require('react-responsive-carousel').Carousel;

const Slide = (movie) => {
    let image_path = "https://image.tmdb.org/t/p/w500";
    return (
        <>
            <Carousel >
                <div>
                    <img src={image_path + movie.info.poster_path}></img>
                </div>
            </Carousel>
        </>);
}

// export default function makeRed(Component) {
//     return class RedComponent extends Component {
//         constructor(props) {
//             super(props);

//             RedComponent.displayName = `Red${Component.name}`;
//         }

//         render() {
//             let componentElement = super.render();
//             let { children, ...rest } = componentElement.props;
//             children = React.Children.map(children, child => {
//                 return React.cloneElement(child, {
//                     ...child.props,
//                     style: {
//                         backgroundColor: "red"
//                     }
//                 });
//             });
//             return React.cloneElement(componentElement, rest, ...children);
//         }
//     };
// }

export default Slide;
