<script>
import CourseCard from "../components/CourseCard.vue";
import MeetingCard from "../components/MeetingCard.vue";
import ChatListItem from "../components/ChatListItem.vue";

export default {
  name: "MainPage",
  components: {
    CourseCard,
    MeetingCard,
    ChatListItem,
  },
};
</script>
<template>
  <div class="wrap">
    <div class="main-content">
      <div class="course-cards">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
      <div>
        <h2 class="title">Заняття на сьогодні</h2>
        <div class="meetings-block">
          <MeetingCard />
          <MeetingCard />
          <MeetingCard />
          <MeetingCard />
          <MeetingCard />
          <MeetingCard />
          <MeetingCard />
          <MeetingCard />
        </div>
      </div>
    </div>
    <div class="chatbox">
      <h3>Messages</h3>
      <div class="chatbox-content">
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
      </div>
    </div>
  </div>
</template>
<style src="../styles/MainPage.css" scoped></style>
