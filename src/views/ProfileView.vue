<script setup>
import { NAvatar, NTabs, NTabPane } from 'naive-ui'
import { Icon } from '@iconify/vue'
import ProfileForm from '@/components/Form/ProfileForm.vue'
</script>

<template>
  <main class="main">
    <section class="profile-block block">
      <div class="cover-img"></div>

      <div class="profile-body">
        <div class="avatar">
          <div class="img">
            <NAvatar
              v-if="1"
              round
              size="100"
              src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
            />
            <Icon v-else icon="lineicons:user" />
          </div>

          <button type="button" class="btn-edit-img">
            <Icon icon="lets-icons:edit-duotone-line" />
          </button>
        </div>

        <p class="user-name">User Name</p>

        <div class="user-info">
          <div class="info">
            <p class="account">
              user_account
              <span class="tag">管理員</span>
            </p>
            <p class="email">
              <Icon icon="si:mail-duotone" />
              example@mail.com
            </p>
          </div>
          <div class="links"></div>
        </div>
      </div>
    </section>

    <section class="block">
      <NTabs default-value="profile" size="large" class="profile-tabs form-tabs" animated>
        <NTabPane name="profile" tab="資料維護">
          <ProfileForm />
        </NTabPane>

        <NTabPane name="password" tab="免密碼設定">
          <Icon icon="ic:outline-fingerprint" />
        </NTabPane>
      </NTabs>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.profile {
  &-block {
    padding: 0;
    overflow: hidden;
  }

  &-body {
    position: relative;
    padding: var(--base-gap);
    padding-top: 100px;
  }
}

.cover-img {
  width: 100%;
  height: 180px;
  background: linear-gradient(
    45deg,
    rgba(117, 185, 203, 1) 0%,
    rgba(175, 218, 226, 1) 54%,
    rgba(0, 212, 255, 1) 100%
  );

  @include xs {
    height: 150px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.avatar {
  position: relative;
  width: 148px;
  height: 148px;
  background: var(--block-color-background-o9);
  border-radius: 50%;
  padding: 4px;
  position: absolute;
  top: 0;
  left: var(--base-gap);
  z-index: 1;
  transform: translateY(-38%);

  @include xs {
    width: 128px;
    height: 128px;
  }

  &:hover {
    .btn-edit-img {
      opacity: 1;
      pointer-events: all;
    }
  }

  .img {
    width: 100%;
    height: 100%;
    background: var(--color-background);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 50%;
      height: 50%;
      color: var(--color);
      transform: translateY(-10px);
    }
  }

  .btn-edit-img {
    width: 30%;
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background-color: var(--edit-img-background);
    border-radius: 50%;
    border: none;
    position: absolute;
    right: 4px;
    bottom: 4px;
    z-index: 2;
    transition: 0.3s ease;
    padding: 8px 7px 8px 9px;
    opacity: 0;
    pointer-events: none;

    &:hover {
      background-color: var(--edit-img-background-hover);
    }

    svg {
      width: 100%;
      height: 100%;
    }
  }
}

.user-name {
  font-size: 1.875rem;
  font-weight: 900;
  line-height: 1.2;
  letter-spacing: 0.03em;
  color: var(--color-text);
  position: absolute;
  top: var(--base-gap);
  left: 200px;
  right: var(--base-gap);
  z-index: 1;

  @include xs {
    left: 160px;
    font-size: 1.5rem;
  }
}

.user-info {
  display: flex;
  justify-content: space-between;
  column-gap: 16px;

  .info {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    line-height: 1.25;
    color: var(--color-text);

    p {
      letter-spacing: 0.02em;
      display: flex;
      align-items: center;
      column-gap: 8px;

      @include xs {
        column-gap: 5px;
      }

      svg {
        flex-shrink: 0;
        transform: translateY(2px);

        @include xs {
          transform: translateY(1px);
        }
      }
    }

    .account {
      font-size: 1.75rem;
      font-weight: 700;

      @include xs {
        font-size: 1.25rem;
      }
    }

    .email {
      font-size: 1rem;
      font-weight: 500;

      @include xs {
        font-size: 0.875rem;
      }
    }

    .tag {
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.1em;
      color: var(--color);
      border-radius: 50px;
      border: 1px solid var(--color);
      padding: 2px 6px 3px;
    }
  }
}
</style>
