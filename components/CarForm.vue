<template>
  <b-form @submit.prevent="submit">
    <b-row align-h="end">
      <b-col class="text-right">
        <b-link :to="'/cars'">
          {{ $t('back') }}
        </b-link>
      </b-col>
    </b-row>
    <b-form-group :label="$t('cars.make')">
      <b-form-input
        id="carMakeInput"
        ref="make"
        v-validate="{required: true}"
        name="car[make]"
        :state="validateState('make')"
        type="text"
        data-vv-delay="500"
        :placeholder="$t('cars.make_placeholder')"
        :value="car.make"
        @input="mergeCar({'make': $event})"
      />
      <b-form-invalid-feedback>{{ $t('forms.errors.required') }}</b-form-invalid-feedback>
    </b-form-group>
    <b-btn class="my-3" type="submit">
      {{ isUpdate() ? $t('update') : $t('save') }}
    </b-btn>
    <hr>
    <small><b-badge>Important</b-badge> This is a fake server and won't actually update the record.</small>
  </b-form>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'CarForm',
  computed: {
    ...mapState('cars', [
      'car'
    ])
  },
  methods: {
    ...mapMutations({ mergeCar: 'cars/mergeCars' }),
    isUpdate () { return this.car.hasOwnProperty('id') },
    submit () {
      const vm = this
      const action = 'cars/' + (this.isUpdate() ? 'update' : 'create')
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.dispatch(action, this.car)
            .then((resp) => {
              const msg = resp.data.name + ' ' + (vm.$t('car.' + this.isUpdate() ? 'updated' : 'created'))
              vm.$notify({ text: msg, type: 'success', group: 'alerts' })
              vm.$router.push('/cars')
            })
            .catch((resp) => {
              vm.$notify({ text: vm.$t('forms.errors.standard'), type: 'warning', group: 'alerts' })
            })
        } else {
          vm.$notify({ text: vm.$t('forms.errors.invalid'), type: 'warning', group: 'alerts' })
        }
      })
    },
    validateState (ref) {
      if (this.veeFields[ref] && this.veeFields[ref].dirty) {
        return !this.errors.has(ref)
      } else {
        return null
      }
    }
  }
}
</script>
