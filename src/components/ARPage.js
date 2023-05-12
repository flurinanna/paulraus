import MindARThreeViewer from './mindar-three-viewer';

export default function ARPage({children}) {
    return <div>
            <div className="container">
                <MindARThreeViewer />
        </div>
    </div>
}