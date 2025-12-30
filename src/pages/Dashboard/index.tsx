import { useNavigation } from '@react-navigation/native';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  Container,
  Header,
  HeaderTitle,
  ProfileButton,
  ProviderAvatar,
  ProviderContainer,
  ProviderInfo,
  ProviderMeta,
  ProviderMetaText,
  ProviderName,
  ProvidersList,
  ProvidersListTitle,
  UserAvatar,
  UserName,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const { user } = useAuth();
  const { navigate } = useNavigation() as unknown as {
    navigate: (route: string, params?: Record<string, unknown>) => void;
  };

  useEffect(() => {
    api.get('providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', { providerId });
    },
    [navigate],
  );

  interface ProvidersListProps {
    keyExtractor: (item: Provider) => string;
    data: Provider[];
    ListHeaderComponent: React.ReactElement;
    renderItem: (info: { item: Provider }) => React.ReactElement;
  }

  const providersListProps: ProvidersListProps = {
    keyExtractor: (provider: Provider) => provider.id,
    data: providers,
    ListHeaderComponent: <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>,
    renderItem: ({ item: provider }: { item: Provider }) => (
      <ProviderContainer
        onPress={() => {
          navigateToCreateAppointment(provider.id);
        }}
      >
        <ProviderAvatar source={{ uri: provider.avatar_url }} />

        <ProviderInfo>
          <ProviderName>{provider.name}</ProviderName>

          <ProviderMeta>
            <Icon name="calendar" size={14} color="#ff9000" />
            <ProviderMetaText>Segunda à sexta</ProviderMetaText>
          </ProviderMeta>

          <ProviderMeta>
            <Icon name="clock" size={14} color="#ff9000" />
            <ProviderMetaText>8h às 18h</ProviderMetaText>
          </ProviderMeta>
        </ProviderInfo>
      </ProviderContainer>
    ),
  };

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem Vindo,
          {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>

      {/* @ts-expect-error - styled FlatList typing conflict */}
      <ProvidersList {...providersListProps} />
    </Container>
  );
};

export default Dashboard;
