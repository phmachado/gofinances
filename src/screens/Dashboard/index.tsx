import React from "react";
import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
} from "./styles";
import HighlightCard from "../../components/HighlightCard";

export default function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/49461500?v=4",
              }}
            />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Pedro</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard
          title="Entrada"
          amount="R$ 37.800,00"
          lastTransaction="Última entrada dia 13 de Abril"
        />
        <HighlightCard
          title="Entrada"
          amount="R$ 37.800,00"
          lastTransaction="Última entrada dia 13 de Abril"
        />
        <HighlightCard
          title="Entrada"
          amount="R$ 37.800,00"
          lastTransaction="Última entrada dia 13 de Abril"
        />
      </HighlightCards>
    </Container>
  );
}
