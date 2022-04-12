import DirectorItem from './DirectorItem';
import classes from './DirectorList.module.css';

function DirectorList(props) {
    return (
        <ul className={classes.list}>
            {props.director.map((director) => (
                <DirectorItem
                    key={director.id}
                    id={director.id}
                    image={director.image}
                    name={director.title}
                />
            ))}
        </ul>
    );
}

export default DirectorList