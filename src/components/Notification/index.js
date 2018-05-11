/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { connect } from 'react-redux';
import ActionCreators from 'store/ducks/notification';

/* Presentational */
import { Animated, TouchableOpacity, View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

class Notification extends Component {
    state = {
        height: new Animated.Value(0),
        visible: false,
        event: undefined,
    };

    componentDidMount() {
        // this.show();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open) {
            if (nextProps.open) {
                console.tron.log('Chama o show()');
                this.show()
            } else {
                console.tron.log('Chamou o hide()');
                this.hide();
            }
        }
    }

    hide = () => {
        this.setState({ visible: false });
        this.props.clean();
        Animated.timing(this.state.height, {
            duration: 500,
            toValue: 0,
        }).start();
    }

    show = () => {
        this.setState({
            event: setTimeout(() => this.hide(), this.props.time),
            visible: true,
        });
        Animated.timing(this.state.height, {
            duration: 500,
            toValue: 56,
        }).start();
    }

    onPressHide = () => {
        this.state.event && clearTimeout(this.state.event);
        this.hide();
    }

    render() {
        const { text } = this.props;
        return (
            <Animated.View style={[styles.container, { height: this.state.height}]}>
                <Text style={styles.text}>{text}</Text>
                <TouchableOpacity
                    onPress={this.onPressHide}
                    style={styles.button}
                >
                    <Icon name="times" size={14}/>
                </TouchableOpacity>
            </Animated.View>
          );
    }
}

const mapStateToProps = state => ({
    text: state.notification.text,
    time: state.notification.time,
    type: state.notification.type,
    open: state.notification.open,
});

const mapDispatchToProps = dispatch => ({
    clean: () => dispatch(ActionCreators.clean()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Notification);
