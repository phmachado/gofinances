import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

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
  LoadContainer,
  LogoutButton,
} from "./styles";
import HighlightCard from "../../components/HighlightCard";
import TransactionCard, {
  TransactionCardProps,
} from "../../components/TransactionCard";
import { useAuth } from "../../hooks/auth";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

type HighlightProps = {
  amount: string;
};

type HighlightData = {
  entries: HighlightProps;
  expenses: HighlightProps;
  total: HighlightProps;
  lastEntry: string | undefined;
  lastExpense: string | undefined;
  lastTransaction: string | undefined;
  firstTransaction: string | undefined;
};

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );

  const theme = useTheme();
  const { signOut, user } = useAuth();

  function formatDate(date: string | number) {
    if (!date) return;
    return Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(new Date(date));
  }

  async function loadTransactions() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    const sortedEntries = transactions
      .filter((item: DataListProps) => item.type === "positive")
      .map((item: DataListProps) => new Date(item.date).getTime())
      .sort((a: number, b: number) => a - b);

    const sortedExpenses = transactions
      .filter((item: DataListProps) => item.type === "negative")
      .map((item: DataListProps) => new Date(item.date).getTime())
      .sort((a: number, b: number) => a - b);

    const sortedTransactions = transactions
      .map((item: DataListProps) => new Date(item.date).getTime())
      .sort((a: number, b: number) => a - b);

    const lastEntry = formatDate(sortedEntries.slice(-1)[0]);
    const lastExpense = formatDate(sortedExpenses.slice(-1)[0]);
    const lastTransaction = formatDate(sortedTransactions.slice(-1)[0]);
    const firstTransaction = formatDate(sortedTransactions[0]);

    let entriesTotal = 0;
    let expensesTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === "positive") {
          entriesTotal += Number(item.amount);
        } else {
          expensesTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = formatDate(item.date);

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        };
      }
    );

    setData(transactionsFormatted);
    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      expenses: {
        amount: expensesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      total: {
        amount: (entriesTotal - expensesTotal).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      lastEntry: lastEntry || formatDate(new Date().getTime()),
      lastExpense: lastExpense || formatDate(new Date().getTime()),
      lastTransaction: lastTransaction || formatDate(new Date().getTime()),
      firstTransaction: firstTransaction || formatDate(new Date().getTime()),
    });

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: user.photo,
                  }}
                />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighlightCards>
            <HighlightCard
              type="up"
              title="Entrada"
              amount={highlightData.entries.amount}
              lastTransaction={`Última entrada em ${highlightData.lastEntry}`}
            />
            <HighlightCard
              type="down"
              title="Saídas"
              amount={highlightData.expenses.amount}
              lastTransaction={`Última saída em ${highlightData.lastExpense}`}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={`${highlightData.firstTransaction} à ${highlightData.lastTransaction}`}
            />
          </HighlightCards>
          <Transactions>
            <Title>Listagem</Title>
            <TransactionsList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
