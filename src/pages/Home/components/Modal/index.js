/* Core */
import React, { Component } from 'react';

/* Presentational */
import {
  Modal as ModalNative,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import Button from 'components/Button';
import Input from 'components/Input';

import styles from './styles';

class Modal extends Component {
  render() {
    return (
      <ModalNative
        animationType='slide'
        visible={this.props.visible}
        transparent
        onRequestClose={() => {}}
      >
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Input
              icon="calendar"
              placeholder="Selecione a data e o horário"
              type="none"
              secondary
            />
            <Input
              placeholder="Qual o nome do evento?"
              type="none"
              secondary
            />
            <Input
              placeholder="Onde irá ocorrer?"
              type="none"
              secondary
            />

            <Button
              title='Criar evento'
              onPress={() => {}}
            />
            <TouchableOpacity 
              onPress={() => {
                this.props.onCloseModal();
              }}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText} >Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalNative>
    )
  }
}

export default Modal;