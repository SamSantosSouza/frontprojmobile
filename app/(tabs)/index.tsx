import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Platform, View, ActivityIndicator } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';



const Drawer = createDrawerNavigator();

export default function HomeScreen() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Configura a URL baseada na plataforma
  const getApiUrl = () => {
    const localIp = '10.67.168.155'; // SUBSTITUA pelo seu IP local
    
    return Platform.select({
      ios: 'http://localhost:3000/usuarios',      // iOS Simulator
      android: 'http://10.0.2.2:3000/usuarios',  // Android Emulator
      default: `http://${localIp}:3000/usuarios` // Dispositivo físico
    });
  };

  // Faz a requisição para a API
  useEffect(() => {
    const apiUrl = getApiUrl();
    console.log('Conectando ao endpoint:', apiUrl);

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Erro na requisição:', err);
        setError(`Não foi possível conectar à API. Erro: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Exibe um indicador de carregamento
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <ThemedText>Carregando dados...</ThemedText>
      </View>
    );
  }

  // Exibe erro caso ocorra
  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <ThemedText type="subtitle" style={styles.errorText}>
          {error}
        </ThemedText>
        <ThemedText style={styles.solutionText}>
          Solução: Verifique se o servidor está rodando e se o IP está correto.
        </ThemedText>
      </View>
    );
  }

  // Exibe os dados quando a requisição é bem-sucedida
  return (
    <View>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Data from API:</ThemedText>
        
        {Array.isArray(data) ? (
          data.map((item, index) => (
            <ThemedView key={index} style={styles.dataItem}>
              <ThemedText>ID: {item.id}</ThemedText>
              <ThemedText>Name: {item.nome || 'N/A'}</ThemedText>
              <ThemedText>Email: {item.email || 'N/A'}</ThemedText>
            </ThemedView>
          ))
        ) : (
          <ThemedText>{JSON.stringify(data, null, 2)}</ThemedText>
        )}
      </ThemedView>
</View>
  );
}


const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorText: {
    color: '#d32f2f',
    marginBottom: 10,
    textAlign: 'center',
  },
  solutionText: {
    textAlign: 'center',
    color: '#666',
  },
  dataItem: {
    marginBottom: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 4,
  },
});
