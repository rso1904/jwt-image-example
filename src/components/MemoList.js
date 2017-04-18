import React from 'react';
import { Memo } from 'components';
import ReactCSSTransitionsGroup from 'react-addons-css-transition-group';

class MemoList extends React.Component {

    shouldComponentupdate(nextProps, nextState) {
        let update = JSON.stringify(this.props) !== JSON.stringify(nextProps);
        return update;
    }

    render() {
        const mapToComponents = data => {
            return data.map((memo, i) => {
                return (<Memo
                            data={memo}
                            ownership={(memo.writer === this.props.currentUser)}
                            key={memo._id}
                            index={i}
                            onEdit={this.props.onEdit}
                            onRemove={this.props.onRemove}
                            onStar={this.props.onStar}
                            currentUser={this.props.currentUser}
                />);
            });
        };

        return (
            <div>
                <ReactCSSTransitionsGroup transitionName="memo"
                    transitionEnterTimeout={2000}
                    transitionLeaveTimeout={1000}>
                    {mapToComponents(this.props.data)}
                </ReactCSSTransitionsGroup>
            </div>  
        );
    }
}

MemoList.propTypes = {
    data: React.PropTypes.array,
    currentUser: React.PropTypes.string,
    onEdit: React.PropTypes.func,
    onRemove: React.PropTypes.func,
    onStar: React.PropTypes.func
};

MemoList.defaultProps = {
    data: [],
    currentUser: '',
    onEdit: (id, index, contents) => {
        console.error('edit function not deffined');
    },
    onRemove: (id, index) => {
        console.error('remove function not defined');
    },
    onStar: (id, index) => {
        console.error('star function not defined');
    }
};

export default MemoList;