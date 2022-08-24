import React from "react";
import HistoryCard from "../../components/HistoryCard";

import { Container, Header, Title } from "./styles";

export default function Resume() {
  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <HistoryCard color="red" title="Compras" amount="R$ 150,50" />
      <HistoryCard color="red" title="Compras" amount="R$ 150,50" />
      <HistoryCard color="red" title="Compras" amount="R$ 150,50" />
    </Container>
  );
}
