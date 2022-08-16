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
  Transactions,
  Title,
  TransactionsList,
} from "./styles";
import HighlightCard from "../../components/HighlightCard";
import TransactionCard from "../../components/TransactionCard";
import { getBottomSpace } from "react-native-iphone-x-helper";

type Category = {
  name: string;
  icon: string;
};

type Data = {
  type: "positive" | "negative";
  title: string;
  amount: string;
  category: Category;
  date: string;
};

type Item = {
  item: Data;
};

export default function Dashboard() {
  const data = [
    {
      type: "positive",
      title: "Desenvolvimento de app",
      amount: "R$ 5.000,00",
      category: { name: "Vendas", icon: "dollar-sign" },
      date: "18/04/2022",
    },
    {
      type: "negative",
      title: "Pizza",
      amount: "R$ 50,00",
      category: { name: "Alimentação", icon: "coffee" },
      date: "17/04/2022",
    },
    {
      type: "negative",
      title: "Aluguel do apartamento",
      amount: "R$ 1.500,00",
      category: { name: "Casa", icon: "shopping-bag" },
      date: "15/04/2022",
    },
  ];

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
          type="up"
          title="Entrada"
          amount="R$ 37.800,00"
          lastTransaction="Última entrada dia 13 de Abril"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 7.800,00"
          lastTransaction="Última saída dia 03 de Abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 30.000,00"
          lastTransaction="01 à 16 de Abril"
        />
      </HighlightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionsList
          data={data}
          renderItem={({ item }: Item) => <TransactionCard data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: getBottomSpace() }}
        />
      </Transactions>
    </Container>
  );
}
